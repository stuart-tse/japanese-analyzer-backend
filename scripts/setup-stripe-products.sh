#!/bin/bash

# Stripe Product and Price Setup Script
# This script creates products and prices for the Japanese Analyzer subscription system

set -e  # Exit on error

echo "======================================================================"
echo "Creating Stripe Products and Prices for Japanese Analyzer"
echo "======================================================================"
echo ""

# Check if Stripe CLI is logged in
if ! stripe config --list &>/dev/null; then
    echo "❌ Error: Stripe CLI not logged in"
    echo "Please run: stripe login"
    exit 1
fi

echo "✅ Stripe CLI authenticated"
echo ""

# ============================================================================
# PRO TIER
# ============================================================================

echo "Creating PRO tier products..."
echo ""

# Create Pro Product
echo "→ Creating Pro product..."
PRO_PRODUCT=$(stripe products create \
  --name="Japanese Analyzer Pro" \
  --description="Access to travel, movies, drama, and comic Japanese lessons + 1000 credits/month" \
  -d "metadata[tier]=PRO" \
  -d "metadata[credits_per_month]=1000")

PRO_PRODUCT_ID=$(echo "$PRO_PRODUCT" | jq -r '.id')
echo "✅ Pro Product ID: $PRO_PRODUCT_ID"
echo ""

# Create Pro Monthly Price
echo "→ Creating Pro Monthly price (\$9.99/month)..."
PRO_MONTHLY_PRICE=$(stripe prices create \
  --product="$PRO_PRODUCT_ID" \
  --unit-amount=999 \
  --currency=usd \
  -d "recurring[interval]=month" \
  -d "metadata[tier]=PRO" \
  -d "metadata[period]=monthly" \
  -d "metadata[credits]=1000")

PRO_MONTHLY_PRICE_ID=$(echo "$PRO_MONTHLY_PRICE" | jq -r '.id')
echo "✅ Pro Monthly Price ID: $PRO_MONTHLY_PRICE_ID"
echo ""

# Create Pro Yearly Price
echo "→ Creating Pro Yearly price (\$99.99/year, save 17%)..."
PRO_YEARLY_PRICE=$(stripe prices create \
  --product="$PRO_PRODUCT_ID" \
  --unit-amount=9999 \
  --currency=usd \
  -d "recurring[interval]=year" \
  -d "metadata[tier]=PRO" \
  -d "metadata[period]=yearly" \
  -d "metadata[credits]=1000")

PRO_YEARLY_PRICE_ID=$(echo "$PRO_YEARLY_PRICE" | jq -r '.id')
echo "✅ Pro Yearly Price ID: $PRO_YEARLY_PRICE_ID"
echo ""

# ============================================================================
# PREMIUM TIER
# ============================================================================

echo "Creating PREMIUM tier products..."
echo ""

# Create Premium Product
echo "→ Creating Premium product..."
PREMIUM_PRODUCT=$(stripe products create \
  --name="Japanese Analyzer Premium" \
  --description="Pro features + JLPT prep + mock exams + 5000 credits/month" \
  -d "metadata[tier]=PREMIUM" \
  -d "metadata[credits_per_month]=5000")

PREMIUM_PRODUCT_ID=$(echo "$PREMIUM_PRODUCT" | jq -r '.id')
echo "✅ Premium Product ID: $PREMIUM_PRODUCT_ID"
echo ""

# Create Premium Monthly Price
echo "→ Creating Premium Monthly price (\$29.99/month)..."
PREMIUM_MONTHLY_PRICE=$(stripe prices create \
  --product="$PREMIUM_PRODUCT_ID" \
  --unit-amount=2999 \
  --currency=usd \
  -d "recurring[interval]=month" \
  -d "metadata[tier]=PREMIUM" \
  -d "metadata[period]=monthly" \
  -d "metadata[credits]=5000")

PREMIUM_MONTHLY_PRICE_ID=$(echo "$PREMIUM_MONTHLY_PRICE" | jq -r '.id')
echo "✅ Premium Monthly Price ID: $PREMIUM_MONTHLY_PRICE_ID"
echo ""

# Create Premium Yearly Price
echo "→ Creating Premium Yearly price (\$299.99/year, save 17%)..."
PREMIUM_YEARLY_PRICE=$(stripe prices create \
  --product="$PREMIUM_PRODUCT_ID" \
  --unit-amount=29999 \
  --currency=usd \
  -d "recurring[interval]=year" \
  -d "metadata[tier]=PREMIUM" \
  -d "metadata[period]=yearly" \
  -d "metadata[credits]=5000")

PREMIUM_YEARLY_PRICE_ID=$(echo "$PREMIUM_YEARLY_PRICE" | jq -r '.id')
echo "✅ Premium Yearly Price ID: $PREMIUM_YEARLY_PRICE_ID"
echo ""

# ============================================================================
# SUMMARY
# ============================================================================

echo "======================================================================"
echo "✅ All products and prices created successfully!"
echo "======================================================================"
echo ""
echo "Add these to your .env file:"
echo ""
echo "# Stripe Price IDs"
echo "STRIPE_PRO_MONTHLY_PRICE_ID=$PRO_MONTHLY_PRICE_ID"
echo "STRIPE_PRO_YEARLY_PRICE_ID=$PRO_YEARLY_PRICE_ID"
echo "STRIPE_PREMIUM_MONTHLY_PRICE_ID=$PREMIUM_MONTHLY_PRICE_ID"
echo "STRIPE_PREMIUM_YEARLY_PRICE_ID=$PREMIUM_YEARLY_PRICE_ID"
echo ""
echo "======================================================================"
echo "Product Summary:"
echo "======================================================================"
echo ""
echo "PRO TIER ($PRO_PRODUCT_ID)"
echo "  - Monthly: \$9.99/month ($PRO_MONTHLY_PRICE_ID)"
echo "  - Yearly:  \$99.99/year ($PRO_YEARLY_PRICE_ID) - Save 17%"
echo "  - Credits: 1000/month"
echo ""
echo "PREMIUM TIER ($PREMIUM_PRODUCT_ID)"
echo "  - Monthly: \$29.99/month ($PREMIUM_MONTHLY_PRICE_ID)"
echo "  - Yearly:  \$299.99/year ($PREMIUM_YEARLY_PRICE_ID) - Save 17%"
echo "  - Credits: 5000/month"
echo ""
echo "======================================================================"
echo "Next Steps:"
echo "======================================================================"
echo ""
echo "1. Copy the price IDs above to your .env file"
echo "2. View products in Stripe Dashboard:"
echo "   https://dashboard.stripe.com/test/products"
echo ""
echo "To test subscriptions:"
echo "  stripe listen --forward-to localhost:4000/api/webhooks/stripe"
echo ""
