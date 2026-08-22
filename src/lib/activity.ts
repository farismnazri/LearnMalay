"use client";

import { useEffect, useRef } from "react";

import type { ClientActivityEvent } from "./activityTypes";
import type { GameId } from "./highscoresTypes";
import { isMinigameUnlocked } from "./minigameUnlocks";
import type { UserProfile } from "./userStoreTypes";

async function sendActivity(event: ClientActivityEvent) {
  await fetch("/api/activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => undefined);
}

function useOnceWhenEnabled(enabled: boolean, createEvent: () => ClientActivityEvent) {
  const sentRef = useRef(false);
  const eventRef = useRef<ClientActivityEvent | null>(null);

  useEffect(() => {
    if (!enabled || sentRef.current) return;
    sentRef.current = true;
    eventRef.current ??= createEvent();
    void sendActivity(eventRef.current);
  }, [createEvent, enabled]);
}

export function useChapterStartedActivity(user: UserProfile | null, chapterId: number, enabled: boolean) {
  useOnceWhenEnabled(Boolean(user) && enabled, () => ({
    eventId: crypto.randomUUID(),
    type: "chapter_started",
    chapterId,
  }));
}

export function useMinigameStartedActivity(user: UserProfile | null, minigameId: GameId) {
  useOnceWhenEnabled(Boolean(user) && isMinigameUnlocked(user, minigameId), () => ({
    eventId: crypto.randomUUID(),
    type: "minigame_started",
    minigameId,
  }));
}
