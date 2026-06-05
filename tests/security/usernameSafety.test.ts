import assert from "node:assert/strict";
import test from "node:test";
import { validateUsernameSafety } from "../../src/lib/usernameSafety.ts";

function assertUnsafe(username: string) {
  const result = validateUsernameSafety(username);
  assert.equal(result.ok, false, `${username} should be rejected`);
}

function assertSafe(username: string) {
  const result = validateUsernameSafety(username);
  assert.equal(result.ok, true, `${username} should be accepted`);
}

test("rejects required unsafe username examples", () => {
  for (const username of ["boobiesuser123", "fuckyou123", "B_o_o_b"]) {
    assertUnsafe(username);
  }
});

test("rejects casing, separator, and spacing variants", () => {
  for (const username of [
    "FUCKYOU123",
    "b.o.o.b",
    "b-o-o-b",
    "b o o b",
    "b_o_o_b",
    "f.u.c.k-y.o.u",
    "f u c k",
  ]) {
    assertUnsafe(username);
  }
});

test("rejects leet, repeated-letter, and diacritic variants", () => {
  for (const username of [
    "b00biesuser123",
    "B-0-0-B",
    "boooobies",
    "fuuuckyou",
    "cábrón123",
    "c a b r ó n",
  ]) {
    assertUnsafe(username);
  }
});

test("rejects Malay profanity and insult terms", () => {
  for (const username of [
    "babi",
    "babiuser123",
    "B_A_B_I",
    "baabi",
    "babi123",
    "bodoh",
    "bodohplayer",
    "B_O_D_O_H",
    "bangang",
    "sial",
    "celaka",
    "puki",
    "pukimak",
    "puki mak",
    "puki-mak",
    "kimak",
    "k!mak",
    "cibai",
    "cibay",
    "cheebai",
    "c1bai",
    "lancau",
    "lancau123",
    "butoh",
    "butuh",
    "pantek",
    "pundek",
  ]) {
    assertUnsafe(username);
  }
});

test("keeps the babi hutan exception narrow", () => {
  assertSafe("Babi Hutan Fan");

  for (const username of ["babi hutan bodoh", "babi hutan fan puki", "babi user", "babi123"]) {
    assertUnsafe(username);
  }
});

test("accepts normal child-friendly usernames", () => {
  for (const username of ["Ali123", "Sofia", "FarisPlayer", "AkuAkuFan", "Pelajar01"]) {
    assertSafe(username);
  }
});

test("avoids common false positives for normal words and phrases", () => {
  for (const username of [
    "ScunthorpeExplorer",
    "EssexExplorer",
    "ComputadoraFan",
    "Penelope",
    "ConoDeTrafico",
    "Babi Hutan Fan",
    "Kelas Satu",
    "Alamat Jalan",
  ]) {
    assertSafe(username);
  }
});
