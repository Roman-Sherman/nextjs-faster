"use client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ActionState } from "@/lib/middleware";
import { signInSignUp } from "./(login)/actions";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";

export function SignInSignUp() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signInSignUp,
    { error: "" },
  );
  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-1">
        Log in{" "}
        <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
          <polygon points="0,0 5,6 10,0"></polygon>
        </svg>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col px-8 py-4">
        <form className="space-y-6" action={formAction}>
          <span className="text-sm font-semibold text-green-800">Log in</span>
          <div className="flex flex-col gap-4">
            <div className="mt-1">
              <Input
                id="username"
                name="username"
                aria-label="Username"
                type="text"
                autoComplete="username"
                spellCheck={false}
                required
                maxLength={50}
                className="relative block w-full appearance-none rounded-[1px] border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  aria-label="Password"
                  type="password"
                  required
                  maxLength={100}
                  className="relative block w-full appearance-none rounded-[1px] border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {/* todo: rather than using a hidden input, we could use the formAction prop on button */}
            {/* store sign in / sign up here */}
            <input type="hidden" id="mode" name="mode" />

            <Button
              type="submit"
              className="rounded-[1px] bg-green-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={pending}
              onClick={() => {
                const mode = document.getElementById("mode");
                if (mode && mode instanceof HTMLInputElement) {
                  mode.value = "signin";
                }
              }}
            >
              {"Log in"}
            </Button>

            <Button
              type="submit"
              variant={"ghost"}
              className="rounded-[2px] border-[1px] border-green-800 bg-white px-4 py-2 text-xs font-semibold text-green-800"
              disabled={pending}
              onClick={() => {
                const mode = document.getElementById("mode");
                if (mode && mode instanceof HTMLInputElement) {
                  mode.value = "signup";
                }
              }}
            >
              {"Create login"}
            </Button>
          </div>
          {state?.error && (
            <div className="text-sm text-red-500">{state.error}</div>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}

import { signOut } from "./(login)/actions";

export function SignOut(props: { username: string }) {
  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-1">
        {props.username}{" "}
        <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]">
          <polygon points="0,0 5,6 10,0"></polygon>
        </svg>
      </PopoverTrigger>
      <PopoverContent className="flex w-32 flex-col items-center px-8 py-4">
        <form>
          <Button
            formAction={signOut}
            variant={"ghost"}
            className="rounded-[2px] border-[1px] border-green-800 bg-white px-4 py-2 text-xs font-semibold text-green-800"
          >
            {"Sign Out"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
