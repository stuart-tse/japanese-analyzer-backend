# Environment Variables Fix Guide

## Step-by-Step Instructions

### 1. Get RDS Password

Your RDS password was set when you created the RDS instance. If you don't remember it:

**Option A: Use Existing Password**
- Check your password manager or notes
- Look for AWS RDS credentials

**Option B: Reset Password (if forgotten)**
```bash
# Via AWS Console
1. Go to https://console.aws.amazon.com/rds
2. Select your RDS instance
3. Click "Modify"
4. Scroll to "New master password"
5. Enter new password
6. Click "Continue" → "Modify DB Instance"
7. Wait 5-10 minutes for changes to apply
```

**Option C: Check AWS CLI**
```bash
# List your RDS instances to find the endpoint
aws rds describe-db-instances --query "DBInstances[*].[DBInstanceIdentifier,Endpoint.Address]" --output table
```

### 2. Get Stripe Secret Key

**Steps:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Login to your Stripe account
3. Under "Standard keys":
   - **Secret key** (starts with `sk_test_...`) - This is what you need!
   - **Publishable key** (starts with `pk_test_...`) - You already have this
4. Click "Reveal test key" to see the secret key
5. Copy the secret key

**Important:**
- For **testing**: Use keys from "Test mode" (sk_test_...)
- For **production**: Use keys from "Live mode" (sk_live_...)

### 3. Update .env.production

```bash
cd ~/Desktop/japanese-analyzer-backend

# Copy template to .env.production
cp .env.production.template .env.production

# Edit with your favorite editor
nano .env.production
# or
code .env.production
# or
open -a TextEdit .env.production
```

**Update these lines:**

```bash
# Line to find: DATABASE_URL
# Replace: YOUR_RDS_PASSWORD
# With: Your actual RDS password
DATABASE_URL=postgresql://postgres:ACTUAL_PASSWORD_HERE@your-rds-endpoint.us-east-1.rds.amazonaws.com:5432/japanese_analyzer

# Line to find: STRIPE_SECRET_KEY
# Replace: YOUR_ACTUAL_SECRET_KEY
# With: Your Stripe secret key from dashboard
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_FROM_STRIPE_DASHBOARD

# CORS_ORIGIN is already fixed ✅
CORS_ORIGIN=https://masterjapanese.com
```

### 4. Test Database Connection

After updating .env.production, test the connection:

```bash
cd ~/Desktop/japanese-analyzer-backend

# Install dependencies if not already done
npm install

# Test database connection
npm run dev

# You should see:
# "Japanese Analyzer API running on port 4000"
# "MongoDB connected successfully" (or similar for PostgreSQL)
```

**If connection fails:**
- Check RDS security group allows connections from your IP
- Verify RDS endpoint URL is correct
- Confirm password is correct

### 5. Verify All Environment Variables

Run this quick check:

```bash
cd ~/Desktop/japanese-analyzer-backend
node -e "
require('dotenv').config({ path: '.env.production' });
console.log('✅ Environment variables loaded:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('API_KEY:', process.env.API_KEY ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Missing');
"
```

### 6. Commit Template (NOT .env.production!)

```bash
cd ~/Desktop/japanese-analyzer-backend

# Add template to git (safe to commit)
git add .env.production.template FIX_ENV_GUIDE.md

# Commit
git commit -m "docs: add environment variables template and fix guide"

# Push
git push origin main
```

**IMPORTANT:** Never commit `.env.production` - it contains secrets!

---

## Quick Reference

### What You Need

1. **RDS Password**
   - Source: AWS RDS Console or your password manager
   - Format: Any string (your database password)

2. **Stripe Secret Key**
   - Source: https://dashboard.stripe.com/test/apikeys
   - Format: `sk_test_...` (for testing) or `sk_live_...` (for production)

3. **CORS Origin** ✅ Already fixed
   - Value: `https://masterjapanese.com`

### Files Location

- Template: `~/Desktop/japanese-analyzer-backend/.env.production.template`
- Your config: `~/Desktop/japanese-analyzer-backend/.env.production` (create from template)
- This guide: `~/Desktop/japanese-analyzer-backend/FIX_ENV_GUIDE.md`

---

## After Fixing

Once all environment variables are set correctly:

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Deploy to Elastic Beanstalk:**
   ```bash
   eb init
   eb create japanese-analyzer-prod --instance-type t3.micro
   ```

3. **Set environment variables in EB Console:**
   - Go to: EB Console → Environment → Configuration → Software
   - Copy each variable from your `.env.production`
   - Paste into "Environment properties"
   - Save and deploy

---

## Troubleshooting

### Database Connection Error
```
Error: connection to server failed
```
**Fix:**
- Check RDS security group allows your IP
- Verify RDS endpoint is correct
- Confirm password is correct

### Stripe Authentication Error
```
Error: Invalid API Key
```
**Fix:**
- Verify you copied the SECRET key (sk_test_...), not publishable key (pk_test_...)
- Check for trailing spaces when pasting

### CORS Error in Browser
```
Access to fetch blocked by CORS policy
```
**Fix:**
- Verify CORS_ORIGIN=https://masterjapanese.com (no trailing slash)
- Match your frontend domain exactly

---

## Security Reminders

- ✅ `.env.production.template` - Safe to commit (no secrets)
- ❌ `.env.production` - NEVER commit (contains secrets)
- ✅ `.gitignore` includes `.env.production`
- ❌ Never share secrets in public repos or screenshots
