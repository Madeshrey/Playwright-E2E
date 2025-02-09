# Use the official Playwright image with dependencies
FROM mcr.microsoft.com/playwright:v1.41.1  

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install Chrome
RUN npx playwright install --with-deps chrome

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Set environment variables (optional)
ENV CI=true

# Run Playwright tests
CMD ["npx", "playwright", "test","--project=googlechrome"]
