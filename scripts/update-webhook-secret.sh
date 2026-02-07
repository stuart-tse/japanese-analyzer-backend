#!/bin/bash

# Update Stripe Webhook Secret in .env file

if [ -z "$1" ]; then
    echo "Usage: $0 whsec_YOUR_WEBHOOK_SECRET"
    echo ""
    echo "Get your webhook secret by running:"
    echo "  stripe listen --forward-to localhost:4000/api/webhooks/stripe"
    exit 1
fi

WEBHOOK_SECRET=$1

# Validate webhook secret format
if [[ ! $WEBHOOK_SECRET =~ ^whsec_ ]]; then
    echo "❌ Error: Webhook secret should start with 'whsec_'"
    echo "Example: whsec_1234567890abcdefghijklmnopqrstuvwxyz"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found"
    echo "Please run: ./scripts/complete-env-setup.sh first"
    exit 1
fi

# Update webhook secret in .env
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET/" .env
else
    # Linux
    sed -i "s/STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET/" .env
fi

echo "✅ Webhook secret updated in .env!"
echo ""
echo "Current value:"
grep "STRIPE_WEBHOOK_SECRET" .env
echo ""
echo "You can now start your server:"
echo "  npm run dev"
