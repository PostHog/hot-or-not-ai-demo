import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Always redirect to rate page - login is optional
  redirect('/rate');
}
