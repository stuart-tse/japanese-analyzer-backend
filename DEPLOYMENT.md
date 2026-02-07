# Backend Deployment Guide - AWS Elastic Beanstalk

## Prerequisites

1. **AWS CLI installed**
   ```bash
   # macOS
   brew install awscli

   # Verify
   aws --version
   ```

2. **EB CLI installed**
   ```bash
   pip install awsebcli

   # Verify
   eb --version
   ```

3. **AWS credentials configured**
   ```bash
   aws configure
   # Enter: Access Key ID, Secret Access Key, Region (us-east-1), Output (json)
   ```

## Step 1: Initialize Elastic Beanstalk

```bash
cd japanese-analyzer-api

# Initialize EB (first time only)
eb init

# Select:
# - Region: us-east-1 (same as RDS)
# - Application name: japanese-analyzer-api
# - Platform: Node.js
# - Platform version: Node.js 20 running on 64bit Amazon Linux 2023
# - SSH: Yes (for debugging)
```

This creates `.elasticbeanstalk/config.yml`.

## Step 2: Create Environment

```bash
# Create production environment
eb create japanese-analyzer-prod \
  --instance-type t3.micro \
  --envvars \
    NODE_ENV=production,\
    PORT=4000,\
    DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_RDS_PASSWORD@your-rds-endpoint.us-east-1.rds.amazonaws.com:5432/japanese_analyzer",\
    API_KEY="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",\
    API_URL="https://openrouter.ai/api/v1/chat/completions",\
    MODEL_NAME="google/gemini-3-flash-preview",\
    JWT_SECRET="Q9+D0fgvHQ9R++ezgmPIOdxRH1UnHxPa0r3I0do21RU=",\
    CORS_ORIGIN="https://masterjapanese.com",\
    STRIPE_SECRET_KEY="sk_test_YOUR_ACTUAL_SECRET_KEY",\
    STRIPE_PUBLISHABLE_KEY="pk_test_51SxAnYLGknmT1jnq5v4R0CWYYDJFIVVf8GOZZrNk6cTrz8zpDmYb0VniSAWBc9BOdTRfISezulTSM43u8tWtxPZu00D74Aj1Jh"

# This takes 5-10 minutes
```

**IMPORTANT**: Replace `YOUR_ACTUAL_RDS_PASSWORD` and `YOUR_ACTUAL_SECRET_KEY` with real values!

## Step 3: Run Prisma Migrations

After deployment, SSH into the instance to run migrations:

```bash
# SSH into instance
eb ssh japanese-analyzer-prod

# Inside EC2 instance:
cd /var/app/current
npm run prisma:migrate
npm run prisma:seed  # If needed

# Exit
exit
```

**Better approach**: Add migration command to `.ebextensions`:

Create `.ebextensions/04_prisma_migrate.config`:
```yaml
container_commands:
  01_prisma_generate:
    command: "npm run prisma:generate"
    leader_only: true
  02_prisma_migrate:
    command: "npm run prisma:migrate deploy"
    leader_only: true
```

## Step 4: Configure Custom Domain

**Option A: Using Elastic Beanstalk Domain**

Your API will be at:
```
http://japanese-analyzer-prod.us-east-1.elasticbeanstalk.com
```

**Option B: Custom Domain (Recommended)**

1. **Get SSL Certificate (AWS Certificate Manager)**
   ```bash
   # Go to ACM console
   # Request certificate for: api.masterjapanese.com
   # Validate via DNS (add CNAME records to your domain)
   ```

2. **Add Load Balancer (HTTPS)**
   ```bash
   eb config

   # Add under aws:elasticbeanstalk:environment:
   LoadBalancerType: application

   # Add HTTPS listener with ACM certificate ARN
   ```

3. **Update DNS (Route 53 or your DNS provider)**
   ```
   Type: CNAME
   Name: api.masterjapanese.com
   Value: japanese-analyzer-prod.us-east-1.elasticbeanstalk.com
   TTL: 300
   ```

## Step 5: Update Frontend Environment

Update `.env.production` in frontend:

```bash
NEXT_PUBLIC_BACKEND_URL=https://api.masterjapanese.com/api
```

Or if using EB domain:
```bash
NEXT_PUBLIC_BACKEND_URL=http://japanese-analyzer-prod.us-east-1.elasticbeanstalk.com/api
```

Redeploy frontend to AWS Amplify.

## Step 6: Deploy Updates

```bash
# Build TypeScript
npm run build

# Deploy to Elastic Beanstalk
eb deploy

# Check status
eb status

# View logs
eb logs

# Open in browser
eb open
```

## Step 7: Monitoring and Health Checks

**Health Check Endpoint**: `/api/health`

Create this in your Express server if not exists:

```typescript
// src/routes/index.ts
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: 'connected', // Add actual DB check
  });
});
```

**CloudWatch Logs**:
```bash
# View real-time logs
eb logs --stream
```

**Monitoring Dashboard**:
```bash
# Open EB console
eb console
```

## Environment Variables Management

**View current environment variables**:
```bash
eb printenv
```

**Update environment variables**:
```bash
eb setenv CORS_ORIGIN=https://masterjapanese.com DATABASE_URL="postgresql://..."
```

**Or via AWS Console**:
1. Go to Elastic Beanstalk Console
2. Select your environment
3. Configuration → Software → Environment properties
4. Add/Edit variables

## Scaling Configuration

**Auto-scaling** (for production):

```bash
eb config

# Edit:
aws:autoscaling:asg:
  MinSize: 1
  MaxSize: 4

aws:autoscaling:trigger:
  MeasureName: CPUUtilization
  Unit: Percent
  UpperThreshold: 70
  LowerThreshold: 20
```

## Security Checklist

- [ ] SSL/TLS certificate configured (HTTPS)
- [ ] Environment variables set (not in code)
- [ ] CORS_ORIGIN matches frontend domain
- [ ] RDS security group allows EB security group
- [ ] EB instance has IAM role for RDS access
- [ ] Stripe webhook secret configured
- [ ] JWT_SECRET is strong random string
- [ ] Rate limiting enabled in Express app

## Troubleshooting

**Deployment fails**:
```bash
eb logs
# Check /var/log/eb-engine.log
# Check /var/log/nodejs/nodejs.log
```

**Database connection fails**:
- Verify RDS security group allows EB instances
- Check DATABASE_URL is correct
- Ensure RDS is publicly accessible OR in same VPC

**CORS errors**:
- Verify CORS_ORIGIN matches frontend domain exactly
- Check Express CORS middleware configuration

**Health check failing**:
- Verify `/api/health` endpoint exists
- Check PORT environment variable (should be 4000)
- View logs: `eb logs`

## Cost Estimation

**Free Tier (12 months)**:
- t3.micro instance: Free
- 10 GB storage: Free
- Data transfer: 15 GB/month free

**After Free Tier**:
- t3.micro: ~$0.0104/hour = ~$7.50/month
- Load Balancer: ~$16/month (if using HTTPS)
- Data transfer: $0.09/GB after 15 GB

**Total estimated cost**: $20-30/month

## Alternative: AWS App Runner (Simpler)

If Elastic Beanstalk feels complex, consider AWS App Runner:

```bash
# Build Docker image
# Push to ECR
# Create App Runner service via console
# Set environment variables
# Done!
```

App Runner is easier but slightly more expensive (~$25/month vs ~$20/month).

## CI/CD Integration

**GitHub Actions** (`.github/workflows/deploy-backend.yml`):

```yaml
name: Deploy Backend to EB

on:
  push:
    branches: [main]
    paths:
      - 'japanese-analyzer-api/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: |
          cd japanese-analyzer-api
          npm ci
          npm run build

      - name: Deploy to EB
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: japanese-analyzer-api
          environment_name: japanese-analyzer-prod
          version_label: ${{ github.sha }}
          region: us-east-1
          deployment_package: japanese-analyzer-api/
```

## Summary

1. **Install**: `awscli` + `awsebcli`
2. **Initialize**: `eb init`
3. **Create env**: `eb create` with environment variables
4. **Migrate DB**: SSH in and run `prisma migrate deploy`
5. **Custom domain**: Add SSL cert + CNAME record
6. **Deploy**: `npm run build && eb deploy`
7. **Monitor**: `eb logs --stream`

Your backend will be at: `https://api.masterjapanese.com/api`
