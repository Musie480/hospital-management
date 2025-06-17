/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      animation: {
        'float-1': 'float1 15s ease-in-out infinite',
        'float-2': 'float2 18s ease-in-out infinite',
        'float-3': 'float3 20s ease-in-out infinite',
        'float-4': 'float4 22s ease-in-out infinite',
        'float-5': 'float5 25s ease-in-out infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(20px) translateX(-15px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-15px) translateX(-10px)' },
        },
        float4: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(15px) translateX(20px)' },
        },
        float5: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-25px) translateX(15px)' },
        },
      },
    },
  },
  plugins: [],
}
