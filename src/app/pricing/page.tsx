import Link from 'next/link';
import Button from '@/components/ui/button';
import { PlanFeature } from '@/components/ui/pricing';

export default function Pricing() {
  return (
    <div className="p-10 w-full">
      <div className="flex flex-col items-center gap-5">
        <div className="flex pb-20 items-center">
          <div className="heading1">Pricing</div>
        </div>

        {/* Pricing Tiers */}
        <div className="flex flex-col lg:flex-row items-center gap-5 justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 items-center max-w-sm w-full">
            {/* Header */}
            <div className="border-b border-gray-300 w-full items-center justify-center flex flex-col gap-2 pb-2">
              <div className="heading2 text-center">Free</div>
            {/* Sub heading */}
              <div className="subheading3 text-gray-500 text-center">Perfect for individuals and light use</div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-3 w-full py-5">
              <PlanFeature included={true}>Track 2 websites</PlanFeature>
              <PlanFeature included={true}>Real-time uptime/latency status</PlanFeature>
              <PlanFeature included={true}>Daily uptime chart (24h rolling window)</PlanFeature>
              <PlanFeature included={true}>Weekly uptime email notifications</PlanFeature>
              <PlanFeature included={true} limited={true}>Basic public dashboard</PlanFeature>
              <PlanFeature included={true} limited={true}>Single-region uptime checks</PlanFeature>
              <PlanFeature included={false}>No custom domains for status pages</PlanFeature>
              <PlanFeature included={false}>No access to historical uptime data</PlanFeature>
              <PlanFeature included={false}>No down alerts (email/webhook/Slack)</PlanFeature>
              <PlanFeature included={false}>No priority support</PlanFeature>
            </div>
            {/* Call to action */}
            <Button 
              href="/signup?plan=free" 
              className="bg-gradient-to-r from-gray-700 to-gray-500 text-white w-full text-center"
            >
              Start for Free
            </Button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3 items-center max-w-sm w-full">
            {/* Header */}
            <div className="border-b border-gray-300 w-full items-center justify-center flex flex-col gap-2 pb-2">
              <div className="heading2 text-center">Pro</div>
            {/* Sub heading */}
              <div className="subheading3 text-gray-500 text-center">Designed for small businesses and/or developers</div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-3 w-full py-5">
              <PlanFeature included={true}>Track 10 websites</PlanFeature>
              <PlanFeature included={true}>Real-time uptime/latency status</PlanFeature>
              <PlanFeature included={true}>Daily uptime chart (24h rolling window)</PlanFeature>
              <PlanFeature included={true}>Weekly uptime email notifications</PlanFeature>
              <PlanFeature included={true}>Customizable public dashboard</PlanFeature>
              <PlanFeature included={true}>Multi-region uptime checks</PlanFeature>
              <PlanFeature included={true}>Custom domain for public dashboard</PlanFeature>
              <PlanFeature included={true}>Historical uptime data + charts</PlanFeature>
              <PlanFeature included={true}>Downtime alerts (email/webhook/Slack)</PlanFeature>
              <PlanFeature included={true}>Priority customer support</PlanFeature>
            </div>
            {/* Call to action */}
            <Button 
              href="/signup?plan=pro" 
              className="bg-gradient-to-r from-green-700 to-green-500 text-white w-full text-center"
            >
              Choose Pro plan ($6/month)
            </Button>
          </div>
        </div>
      </div>      
    </div>
  )
}