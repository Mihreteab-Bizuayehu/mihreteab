import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center h-screen dark:bg-gray-950 dark:text-white">
      <SignIn  />
    </div>
  );
}
