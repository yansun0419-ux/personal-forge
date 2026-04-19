"use client";

import { useState, useSyncExternalStore } from "react";
import CryptoJS from "crypto-js";

const box =
  "w-full rounded-sm border border-zinc-300 bg-white px-3 py-3 text-sm leading-7 text-zinc-900 outline-none transition hover:border-zinc-500 focus:border-zinc-700";
const btn = "rounded-sm border px-4 py-2 text-sm transition";

function keyIv(password: string) {
  const h = CryptoJS.SHA256(password);
  return {
    key: CryptoJS.lib.WordArray.create(h.words.slice(0, 8)),
    iv: CryptoJS.lib.WordArray.create(h.words.slice(8, 12)),
  };
}

function encryptText(plaintext: string, password: string) {
  const { key, iv } = keyIv(password);
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

function decryptText(ciphertext: string, password: string) {
  const { key, iv } = keyIv(password);
  return CryptoJS.AES.decrypt(ciphertext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
}

export default function CryptoToolPage() {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [transientPassword, setTransientPassword] = useState("");
  const [refresh, setRefresh] = useState(0);

  const rememberPassword =
    hydrated && localStorage.getItem("crypto.rememberPassword") === "true";
  const showPassword =
    hydrated && localStorage.getItem("crypto.showPassword") === "true";
  const storedPassword = hydrated
    ? (localStorage.getItem("crypto.password") ?? "")
    : "";
  const password = rememberPassword ? storedPassword : transientPassword;

  const rerender = () => setRefresh((v) => v + 1 + refresh * 0);
  const setRememberPassword = (next: boolean) => {
    localStorage.setItem("crypto.rememberPassword", String(next));
    if (next) localStorage.setItem("crypto.password", password);
    else localStorage.removeItem("crypto.password");
    rerender();
  };
  const setShowPassword = (next: boolean) => {
    localStorage.setItem("crypto.showPassword", String(next));
    rerender();
  };
  const setPassword = (next: string) => {
    if (rememberPassword) {
      if (next) localStorage.setItem("crypto.password", next);
      else localStorage.removeItem("crypto.password");
      rerender();
    } else {
      setTransientPassword(next);
    }
  };

  const onEncrypt = () => {
    if (!password.trim()) return alert("Please enter a password first.");
    setCiphertext(encryptText(plaintext, password));
  };

  const onDecrypt = () => {
    if (!password.trim()) return alert("Please enter a password first.");
    const p = decryptText(ciphertext, password);
    if (!p)
      return alert(
        "Decryption failed. Please verify the password and ciphertext.",
      );
    setPlaintext(p);
  };

  const onCopy = async (text: string, label: "Plaintext" | "Ciphertext") => {
    if (!text) return alert(`There is no ${label.toLowerCase()} to copy.`);
    try {
      await navigator.clipboard.writeText(text);
      alert(`${label} copied to clipboard.`);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <section className="mb-10 space-y-4 rounded-sm border border-zinc-300 bg-white p-5 sm:p-6">
          <label className="block text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">
            Password
          </label>
          <input
            aria-label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter encryption password"
            className="w-full rounded-sm border border-zinc-300 bg-transparent px-3 py-2.5 text-sm text-zinc-900 outline-none transition hover:border-zinc-500 focus:border-zinc-700"
          />
          <div className="flex flex-wrap gap-6 text-sm text-zinc-700">
            <label className="inline-flex items-center gap-2">
              <input
                aria-label="Remember password"
                type="checkbox"
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
                className="h-4 w-4 rounded-none border-zinc-400 text-zinc-900 focus:ring-zinc-500"
              />
              Remember password
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                aria-label="Show password"
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded-none border-zinc-400 text-zinc-900 focus:ring-zinc-500"
              />
              Show password
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <article className="space-y-4">
            <h2 className="text-lg font-medium tracking-tight">Plaintext</h2>
            <textarea
              aria-label="Plaintext"
              rows={12}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              placeholder="Type content to encrypt or view decrypted plaintext here."
              className={box}
            />
            <div className="flex gap-3">
              <button
                aria-label="Copy plaintext"
                type="button"
                onClick={() => void onCopy(plaintext, "Plaintext")}
                className={`${btn} border-zinc-300 text-zinc-800 hover:border-zinc-500 hover:bg-zinc-100`}
              >
                Copy
              </button>
              <button
                aria-label="Encrypt plaintext"
                type="button"
                onClick={onEncrypt}
                className={`${btn} border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50`}
              >
                Encrypt
              </button>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="text-lg font-medium tracking-tight">Ciphertext</h2>
            <textarea
              aria-label="Ciphertext"
              rows={12}
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              placeholder="Paste encrypted text to decrypt or view encryption output here."
              className={box}
            />
            <div className="flex gap-3">
              <button
                aria-label="Decrypt ciphertext"
                type="button"
                onClick={onDecrypt}
                className={`${btn} border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50`}
              >
                Decrypt
              </button>
              <button
                aria-label="Copy ciphertext"
                type="button"
                onClick={() => void onCopy(ciphertext, "Ciphertext")}
                className={`${btn} border-zinc-300 text-zinc-800 hover:border-zinc-500 hover:bg-zinc-100`}
              >
                Copy
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
