## Switching from npm to pnpm

pnpm is a much faster and more effiecient package manager

1. **Pull the Latest Changes**
   ```sh
   git pull
   ```

2. **Install pnpm**

   ```sh
   npm install -g pnpm@8.15.3
   ```

3. **Delete the node_modules Folder**

   ```sh
   rm -rf node_modules
   ```

   If you're using Windows,

   ```cmd
   rmdir /s /q node_modules
   ```

4. **Install Dependencies with pnpm**

   ```sh
   pnpm install
   pnpm run dev
   ```