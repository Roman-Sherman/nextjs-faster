"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 850) return;
    if (!document.cookie.includes("welcome-toast=3")) {
      toast("🚀 Welcome to NextMaster!", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie += "welcome-toast=3;max-age=31536000";
        },
        description: (
          <>
            This is a recreation of{" "}
            <a
              href="https://www.mcmaster.com/"
              className="text-green-800 hover:underline"
              target="_blank"
            >
              McMaster.com
            </a>{" "}
            in NextJS. All of the 1 million products on this site are AI
            generated.
            <hr className="my-2" />
            This demo is to highlight the speed a full-stack NextJS site can
            achieve.{" "}
            <a
              href="https://git.new/NextMaster"
              className="text-green-800 hover:underline"
              target="_blank"
            >
              Get the Source
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
