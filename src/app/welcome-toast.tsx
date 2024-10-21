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
              className="font-semibold text-green-800 hover:underline"
              target="_blank"
            >
              McMaster.com
            </a>{" "}
            using Next.js. All of the 1M products on this site are AI generated.
            <hr className="my-2" />
            This demo is to highlight the speed a full-stack Next.js site can
            achieve.{" "}
            <a
              href="https://git.new/NextMaster"
              className="font-semibold text-green-800 hover:underline"
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
