"use client";

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";

export default function Home() {
  const { ready, authenticated, login, user } = usePrivy();

  const walletAddress = user?.wallet?.address;

  const handleBuyCrypto = () => {
    const apiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY;
    if (!apiKey || !walletAddress) return;
    const url = `https://global.transak.com?apiKey=${encodeURIComponent(apiKey)}&walletAddress=${encodeURIComponent(walletAddress)}&cryptoCurrencyCode=MATIC&fiatAmount=15`;
    window.open(url, "_blank");
  };

  if (!ready) {
    return (
      <main style={styles.main}>
        <p style={styles.muted}>Caricamento...</p>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <Image
        src="/FRONTE_MERIDIONALE_LOGOVETTORIALE_NERO_page-0001.jpg"
        alt="Fronte Meridionale"
        width={200}
        height={80}
        style={styles.logo}
        priority
      />

      {!authenticated ? (
        <div style={styles.card}>
          <h1 style={styles.h1}>Benvenuto</h1>
          <p style={styles.muted}>
            Accedi per partecipare alla comunità e acquistare crypto.
          </p>
          <button style={styles.btn} onClick={login}>
            Prova
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <p style={styles.success}>Login effettuato ✓</p>
          {walletAddress && (
            <div style={styles.walletBox}>
              <span style={styles.label}>Wallet address:</span>
              <code style={styles.address}>{walletAddress}</code>
            </div>
          )}
          <button style={styles.btn} onClick={handleBuyCrypto}>
            Compra Crypto (MATIC)
          </button>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#0a0a0a",
    color: "#ffffff",
    fontFamily: "system-ui, sans-serif",
    padding: "20px",
  },
  logo: {
    marginBottom: "32px",
    borderRadius: "8px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
  },
  h1: {
    fontSize: "2rem",
    marginBottom: "12px",
  },
  muted: {
    color: "#bfbfbf",
    marginBottom: "24px",
  },
  success: {
    color: "#4ade80",
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  walletBox: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "24px",
    textAlign: "left",
  },
  label: {
    display: "block",
    color: "#bfbfbf",
    fontSize: "0.8rem",
    marginBottom: "4px",
  },
  address: {
    fontSize: "0.85rem",
    wordBreak: "break-all",
    color: "#ffffff",
  },
  btn: {
    padding: "14px 28px",
    borderRadius: "8px",
    background: "#c1121f",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
  },
};
