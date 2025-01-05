## **Full Site**

https://recipe-nextjs-app.vercel.app/

## **Technologies Explored**

- **Next.js**: Leveraged for static site generation, client-side routing, and backend API routes.
- **Supabase**: Used as a backend service with a **PostgreSQL database** to store user data and saved recipes.
- **NextAuth**: Implemented for authentication, using the Google provider for seamless sign-in.
- **TypeScript**: Ensured type safety across the application for robust development.
- **Tailwind CSS**: Used for responsive and modern styling.
- **Edamam API**: Provided rich recipe data to enhance user experience.

## **Key Features**

- **Recipe Search**: Search for recipes based on keywords and dietary preferences.
- **Save Favorites**: Authenticated users can save recipes to their personal favorites list.
- **Google Sign-In**: Secure authentication via NextAuth's Google provider integration.
- **Responsive Design**: Optimized for seamless use on devices of all sizes.

## **What I Learned**

- **Next.js Backend Capabilities**: Gained experience building API routes for features like saving favorites using Supabase.
- **NextAuth Authentication**: Explored integrating authentication with multiple providers and managing user sessions.
- **API Integration**: Improved skills in efficiently fetching and handling third-party API data especially with useSWR.
- **TypeScript**: Gained further confidence in implementing type-safe React components.
- **Responsive Design**: Strengthened ability to create modern, user-friendly interfaces with Tailwind CSS.
  
## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
1.  **Clone the repository**:
     ```
     git clone https://github.com/LataniaReece/recipe-haven.git
     ```
    
2. **Install dependencies:**:
    ```
    cd recipe-haven
    npm install
    ```
        
3. **Set up Environment Variables:**

      Create a .env.local file in the root directory and add your credentials:      
   
      ```
      NEXT_PUBLIC_EDAMAM_API_URL=https://api.edamam.com/api/recipes/v2
      NEXT_PUBLIC_EDAMAM_API_ID=your_api_id
      NEXT_PUBLIC_EDAMAM_API_KEY=your_api_key
      
      NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
      SUPABASE_KEY=your_supabase_key
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      NEXTAUTH_SECRET=your_nextauth_secret
      ```
      
  4. **Run the development server:**:
      ```
      npm run dev
      ```

