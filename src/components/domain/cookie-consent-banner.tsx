"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CookieCategory = {
  id: "necessary" | "analytics" | "preferences" | "marketing";
  description: string;
  enabledByDefault: boolean;
  required: boolean;
  title: string;
};

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  updatedAt: string;
};

type CookieConsentCopy = {
  acceptLabel: string;
  analyticsUnavailableLabel: string;
  bannerDescription: string;
  bannerTitle: string;
  configureLabel: string;
  cookiesPolicyHref?: string;
  cookiesPolicyLabel?: string;
  rejectLabel: string;
  saveLabel: string;
};

type CookieConsentBannerProps = {
  categories: CookieCategory[];
  copy: CookieConsentCopy;
  measurementId?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const storageKey = "cejas_cookie_consent_v1";
const serverSnapshot = "__server__";

function emptyConsent(): ConsentState {
  return {
    analytics: false,
    marketing: false,
    preferences: false,
    updatedAt: new Date().toISOString(),
  };
}

function persistConsent(consent: ConsentState) {
  localStorage.setItem(storageKey, JSON.stringify(consent));
  window.dispatchEvent(new Event("cejas:cookie-consent-changed"));
}

function parseConsentSnapshot(snapshot: string) {
  try {
    return snapshot && snapshot !== serverSnapshot
      ? (JSON.parse(snapshot) as ConsentState)
      : null;
  } catch {
    return null;
  }
}

function readStoredConsent() {
  return parseConsentSnapshot(localStorage.getItem(storageKey) ?? "");
}

function getConsentSnapshot() {
  if (typeof window === "undefined") {
    return serverSnapshot;
  }

  return localStorage.getItem(storageKey) ?? "";
}

function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cejas:cookie-consent-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cejas:cookie-consent-changed", callback);
  };
}

function ensureGtagStub() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function setDefaultConsentMode() {
  ensureGtagStub();
  window.gtag?.("consent", "default", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: "denied",
  });
}

function updateConsentMode(consent: ConsentState) {
  ensureGtagStub();
  window.gtag?.("consent", "update", {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
  });
}

function loadGa4(measurementId?: string) {
  if (!measurementId || document.querySelector("[data-ga4-script]")) {
    return;
  }

  ensureGtagStub();
  const gtag = window.gtag;

  if (!gtag) {
    return;
  }

  gtag("js", new Date());
  gtag("config", measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.ga4Script = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function CookieConsentBanner({
  categories,
  copy,
  measurementId,
}: CookieConsentBannerProps) {
  const consentSnapshot = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    () => serverSnapshot,
  );
  const storedConsent = useMemo(
    () => parseConsentSnapshot(consentSnapshot),
    [consentSnapshot],
  );
  const hasLoaded = consentSnapshot !== serverSnapshot;
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(() => emptyConsent());

  // Only show analytics in the configurator — marketing is not used, preferences has no effect.
  const configuratorCategories = useMemo(
    () => categories.filter((category) => category.id === "analytics"),
    [categories],
  );

  useEffect(() => {
    setDefaultConsentMode();

    if (storedConsent) {
      updateConsentMode(storedConsent);

      if (storedConsent.analytics) {
        loadGa4(measurementId);
      }
    }
  }, [measurementId, storedConsent]);

  useEffect(() => {
    const openPreferences = () => {
      const stored = readStoredConsent();
      setDraft(stored ?? emptyConsent());
      setIsConfiguring(true);
      setIsPreferencesOpen(true);
    };

    document.addEventListener("cejas:open-cookie-preferences", openPreferences);

    return () => {
      document.removeEventListener(
        "cejas:open-cookie-preferences",
        openPreferences,
      );
    };
  }, []);

  function commit(consent: ConsentState) {
    const nextConsent = {
      ...consent,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };

    persistConsent(nextConsent);
    setDraft(nextConsent);
    updateConsentMode(nextConsent);

    if (nextConsent.analytics) {
      loadGa4(measurementId);
    }

    setIsConfiguring(false);
    setIsPreferencesOpen(false);
  }

  const isOpen = hasLoaded && (isPreferencesOpen || !storedConsent);

  if (!hasLoaded || !isOpen) {
    return null;
  }

  return (
    <section
      aria-describedby="cookie-consent-description"
      aria-labelledby="cookie-consent-title"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-background/98 px-4 py-3 shadow-soft backdrop-blur sm:py-4"
      role="region"
    >
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2
            className="font-display text-xl leading-tight text-foreground sm:text-2xl"
            id="cookie-consent-title"
          >
            {copy.bannerTitle}
          </h2>
          <p className="mt-1.5 max-w-3xl text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-sm sm:leading-6">
            <span id="cookie-consent-description">
              {copy.bannerDescription}
            </span>
            {copy.cookiesPolicyHref && copy.cookiesPolicyLabel && (
              <>
                {" "}
                <a
                  className="underline underline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href={copy.cookiesPolicyHref}
                >
                  {copy.cookiesPolicyLabel}
                </a>
              </>
            )}
          </p>
          {isConfiguring ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {configuratorCategories.map((category) => {
                const disabled = false;
                const checkboxId = `cookie-consent-${category.id}`;
                const descriptionId = `${checkboxId}-description`;
                const checked =
                  category.id === "analytics" ? draft.analytics : false;

                return (
                  <label
                    className={cn(
                      "rounded-lg border border-border bg-surface p-4 text-sm",
                      disabled ? "opacity-70" : "cursor-pointer",
                    )}
                    htmlFor={checkboxId}
                    key={category.id}
                  >
                    <span className="flex items-center gap-3 font-semibold text-foreground">
                      <input
                        aria-describedby={descriptionId}
                        checked={checked}
                        className="size-4 accent-primary"
                        disabled={disabled}
                        id={checkboxId}
                        onChange={(event) => {
                          const isChecked = event.currentTarget.checked;
                          setDraft((current) => ({
                            ...current,
                            [category.id]: isChecked,
                          }));
                        }}
                        type="checkbox"
                      />
                      {category.title}
                    </span>
                    <span
                      className="mt-2 block leading-6 text-muted-foreground"
                      id={descriptionId}
                    >
                      {category.description}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : null}
        </div>
        {/* AEPD order: Reject → Accept → Configure. Reject and Accept share equal visual weight. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            className="min-h-11"
            onClick={() => commit(emptyConsent())}
            variant="outline"
          >
            {copy.rejectLabel}
          </Button>
          <Button
            className="min-h-11"
            onClick={() => commit({ ...emptyConsent(), analytics: true })}
            variant="outline"
          >
            {copy.acceptLabel}
          </Button>
          {isConfiguring ? (
            <Button onClick={() => commit(draft)} variant="secondary">
              {copy.saveLabel}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setDraft(storedConsent ?? emptyConsent());
                setIsConfiguring(true);
                setIsPreferencesOpen(true);
              }}
              variant="ghost"
            >
              {copy.configureLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
