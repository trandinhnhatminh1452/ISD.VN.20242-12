#!/bin/bash

# Database Fix Script for BookSeller
# This script will update the database schema to fix the foreign key constraint issues

echo "🔧 Starting database schema fix..."

# Database connection parameters
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="bookseller_db"
DB_USER="buiviethung"

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "❌ Error: psql is not installed or not in PATH"
    echo "Please install PostgreSQL client tools"
    exit 1
fi

# Check if database exists
if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1;" &> /dev/null; then
    echo "❌ Error: Cannot connect to database '$DB_NAME'"
    echo "Please check your database connection parameters"
    exit 1
fi

echo "✅ Connected to database successfully"

# Run the database fix script
echo "📝 Applying database schema fixes..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f BookSeller/fix_database_schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database schema has been successfully updated!"
    echo ""
    echo "📋 Summary of changes:"
    echo "  - Fixed table names and foreign key constraints"
    echo "  - Added missing columns (order_number, payment_method)"
    echo "  - Created proper indexes for performance"
    echo "  - Inserted sample data for testing"
    echo ""
    echo "🚀 You can now restart your Spring Boot application"
else
    echo "❌ Error: Failed to update database schema"
    exit 1
fi

echo ""
echo "🔍 Verifying database structure..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('order', 'payment_transaction', 'invoice', 'product')
ORDER BY table_name, ordinal_position;
"

echo ""
echo "✅ Database fix completed successfully!" 