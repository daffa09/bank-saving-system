# How to Use Apiary Documentation

## What is Apiary?

Apiary is a platform for designing, documenting, and testing APIs. It allows you to create beautiful, interactive API documentation that can be hosted online.

## Setting Up Your API on Apiary

### Step 1: Create an Apiary Account

1. Go to https://apiary.io/
2. Click "Sign Up" or "Get Started"
3. Create an account (you can use GitHub login)

### Step 2: Create a New API

1. After logging in, click "Create New API"
2. Choose a name for your API (e.g., "bank-saving-system-api")
3. Select "API Blueprint" as the format
4. Click "Create API"

### Step 3: Import Your API Documentation

1. In the Apiary editor, delete the default content
2. Open the file `docs/apiary.apib` from this project
3. Copy all the content
4. Paste it into the Apiary editor
5. Click "Save"

### Step 4: Customize Settings

1. Go to "Settings" tab
2. Update:
   - API Name: `Bank Saving System API`
   - API Subdomain: `bank-saving-system` (this will be your URL)
   - Description: `Modern deposito account management system API`

### Step 5: Access Your Documentation

Your API documentation will be available at:
```
https://bank-saving-system.docs.apiary.io/
```

Replace `bank-saving-system` with your chosen subdomain.

## Features You Get

### 1. Interactive Documentation
- Beautiful, clean interface
- Request/response examples
- Try it out directly from the browser

### 2. Mock Server
Apiary provides a mock server at:
```
https://private-anon-xxxxx.apiary-mock.com/bank-saving-system
```

You can test API calls without running your actual server.

### 3. API Console
- Test endpoints directly
- See real-time request/response
- Validate your API

### 4. Collaboration
- Share documentation with team members
- Get feedback and comments
- Version control integration

## Updating Documentation

When you make changes to your API:

1. Update the `docs/apiary.apib` file locally
2. Copy the updated content
3. Paste into Apiary editor
4. Save changes
5. Documentation is updated instantly!

## Example Usage

### Viewing Documentation
```
https://your-api-name.docs.apiary.io/
```

### Using Mock Server
```bash
curl https://private-anon-xxxxx.apiary-mock.com/customers
```

### Testing Endpoints
Use the built-in console or tools like Postman/Insomnia with the mock server URL.

## Benefits

✅ **Professional Documentation** - Clean, modern interface  
✅ **Zero Hosting** - Free hosting on Apiary  
✅ **Interactive Testing** - Try APIs directly from docs  
✅ **Auto-Generated Mock Server** - Test without backend  
✅ **Collaboration Tools** - Share and get feedback  
✅ **Version Control** - Track changes over time  

## Alternative: Self-Hosted Documentation

If you prefer to self-host, you can use tools like:

1. **Aglio** - Convert API Blueprint to HTML
```bash
npm install -g aglio
aglio -i docs/apiary.apib -o api-docs.html
```

2. **Drakov** - Mock server based on API Blueprint
```bash
npm install -g drakov
drakov -f docs/apiary.apib -p 4000
```

## Support

For more help with Apiary:
- Documentation: https://help.apiary.io/
- API Blueprint Spec: https://apiblueprint.org/
- Community: https://community.apiary.io/

---

**Pro Tip:** Link your GitHub repository to Apiary for automatic updates when you push changes!
