import Link from "next/link";

export default function SignInPage() {
  return <main className="auth-page"><form><span className="brand-mark">M</span><h1>Sign in to Meridian OS</h1><p>Use your team account to continue.</p><label>Email<input type="email" autoComplete="email" placeholder="you@company.com" /></label><label>Password<input type="password" autoComplete="current-password" /></label><button className="primary" type="submit">Sign in</button><Link href="/workspace/meridian-demo">Continue with the local demo</Link></form></main>;
}
