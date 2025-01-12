import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import Image from 'next/image'

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex flex-row w-[100%] items-center justify-between border-b p-2">
      <Image src="/TransparentEZEVLogo.png"
          width={100}
          height={100}
          alt="EZEV Secondary Icon"
          className="ml-2"
       />
      <div className="flex flex-row mr-3 items-center">
        <p className="mr-7">Hey, {user.email}!</p>
        <form action={signOutAction}>
          <Button type="submit" variant={"outline"}>
            Sign out
          </Button>
        </form>
        <ThemeSwitcher />
      </div>
    </div>
  ) : (
    <div className="flex flex-row w-[100%] justify-end gap-2 border-b p-5">
      <Button asChild size="sm" className="mr-2" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" className="mr-3" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
      <ThemeSwitcher />
    </div>
  );
}
