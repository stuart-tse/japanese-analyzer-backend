#!/bin/bash

echo "======================================================================"
echo "🚀 Japanese Analyzer - Complete Environment Setup"
echo "======================================================================"
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled. Your existing .env was not modified."
        exit 0
    fi
    echo ""
fi

echo "Step 1: Opening Stripe Dashboard in your browser..."
echo "URL: https://dashboard.stripe.com/test/apikeys"
echo ""

# Open Stripe dashboard
if command -v open &> /dev/null; then
    open https://dashboard.stripe.com/test/apikeys
elif command -v xdg-open &> /dev/null; then
    xdg-open https://dashboard.stripe.com/test/apikeys
else
    echo "Please manually open: https://dashboard.stripe.com/test/apikeys"
fi

echo ""
echo "======================================================================"
echo "📋 Instructions:"
echo "======================================================================"
echo ""
echo "In the Stripe Dashboard that just opened:"
echo "  1. Find the 'Publishable key' (starts with pk_test_)"
echo "  2. Copy it"
echo "  3. For 'Secret key', click 'Reveal test key'"
echo "  4. Copy it (starts with sk_test_)"
echo ""
echo "======================================================================"
echo ""

# Get Stripe Publishable Key
read -p "Paste your STRIPE_PUBLISHABLE_KEY (pk_test_...): " STRIPE_PK
echo ""

# Get Stripe Secret Key
read -p "Paste your STRIPE_SECRET_KEY (sk_test_...): " STRIPE_SK
echo ""

# Validate keys
if [[ ! $STRIPE_PK =~ ^pk_test_ ]]; then
    echo "❌ Error: Publishable key should start with 'pk_test_'"
    exit 1
fi

if [[ ! $STRIPE_SK =~ ^sk_test_ ]]; then
    echo "❌ Error: Secret key should start with 'sk_test_'"
    exit 1
fi

echo "✅ Stripe keys validated!"
echo ""

# Create .env file
echo "Creating .env file..."

cat > .env << EOF
# ====================================================================
# Japanese Analyzer API - Environment Configuration
# AUTO-GENERATED on $(date)
# ====================================================================

# --------------------------------------------------------------------
# Database (AWS RDS PostgreSQL)
# --------------------------------------------------------------------
DATABASE_URL=postgresql://japanese_user:%3F3%3CH3%3Fc%3Aw%7C~5ZcJQUdN%24*dm%5DE94F@japanese-analyzer.cl2gumsuqer5.ap-southeast-2.rds.amazonaws.com:5432/japanese_analyzer?schema=public&sslmode=require

# --------------------------------------------------------------------
# JWT Secrets
# --------------------------------------------------------------------
JWT_SECRET=67d2a7f0d75f2aaa42dc3b4637491364ad22a064b89109132bad48caded0ca276d6cfa82ddc33b38bcc932e07f295f9821cedaa82897661a136cbed278d3fd37
JWT_REFRESH_SECRET=1a06f65567ff088ab8e179ab880dbabe70e6c8265a6111cc5a4dd1a337657857d9906e946278ad5a6680ded63e0bb6f57fdd69c173c5ed81348b6455a5f99221

# --------------------------------------------------------------------
# Stripe API Keys
# --------------------------------------------------------------------
STRIPE_SECRET_KEY=$STRIPE_SK
STRIPE_PUBLISHABLE_KEY=$STRIPE_PK

# --------------------------------------------------------------------
# Stripe Price IDs
# --------------------------------------------------------------------
STRIPE_PRO_MONTHLY_PRICE_ID=price_1SxIUTLGknmT1jnqgd3LHxX1
STRIPE_PRO_YEARLY_PRICE_ID=price_1SxIUULGknmT1jnqXiIkQ9x5
STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_1SxIUXLGknmT1jnqSM9h1p3G
STRIPE_PREMIUM_YEARLY_PRICE_ID=price_1SxIUZLGknmT1jnqS2eKDya6

# --------------------------------------------------------------------
# Stripe Webhook Secret (will be updated after stripe listen)
# --------------------------------------------------------------------
STRIPE_WEBHOOK_SECRET=whsec_temporary_will_be_updated

# --------------------------------------------------------------------
# App URLs
# --------------------------------------------------------------------
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:4000
PORT=4000
NODE_ENV=development

# --------------------------------------------------------------------
# OAuth (optional)
# --------------------------------------------------------------------
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# --------------------------------------------------------------------
# MongoDB (optional - migration period)
# --------------------------------------------------------------------
MONGODB_URI=mongodb://localhost:27017/japanese-analyzer
EOF

echo "✅ .env file created!"
echo ""

echo "======================================================================"
echo "✅ Setup Complete!"
echo "======================================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start webhook listener (in a new terminal):"
echo "   stripe listen --forward-to localhost:4000/api/webhooks/stripe"
echo ""
echo "2. Copy the webhook secret (whsec_...) and run:"
echo "   ./scripts/update-webhook-secret.sh whsec_YOUR_SECRET_HERE"
echo ""
echo "3. Start your server:"
echo "   npm run dev"
echo ""
echo "4. Test the subscription system!"
echo ""
echo "======================================================================"
