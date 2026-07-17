import Link from "next/link";

export default function HomePage() {
  return <main className="landing"><nav><strong>AI Native Operating System</strong><a href="https://github.com/stephenbickel">GitHub</a></nav><section><h1>Your company&apos;s shared operating brain.</h1><p>Give your team one governed place to ask questions, coordinate work, approve agent actions, and automate the routine processes running between your tools.</p><div><Link className="landing-primary" href="/workspace/meridian-demo">Open the Meridian demo</Link><a href="https://github.com/stephenbickel/ai-native-operating-system">View the repository</a></div></section><footer><span>Customer-owned database</span><span>Customer-owned deployment</span><span>Replaceable models and tools</span></footer></main>;
}
