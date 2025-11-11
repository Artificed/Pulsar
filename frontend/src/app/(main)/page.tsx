'use client';

import { userService } from "@/lib/api/modules/user/user-service";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const test = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const result = await userService.getAllUsers();
      return result;
    }
  })

  console.log(test.data)

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
