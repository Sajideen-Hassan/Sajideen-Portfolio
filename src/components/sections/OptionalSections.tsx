"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { Award, Heart, Shield, Users } from "lucide-react";

export default function OptionalSections() {
  const { certifications, volunteerExperience, awards, leadershipCommunity } = portfolioData;

  const hasCerts = certifications && certifications.length > 0;
  const hasVolunteer = volunteerExperience && volunteerExperience.length > 0;
  const hasAwards = awards && awards.length > 0;
  const hasLeadership = leadershipCommunity && leadershipCommunity.length > 0;

  // Render absolutely nothing if there is no data in these arrays
  if (!hasCerts && !hasVolunteer && !hasAwards && !hasLeadership) {
    return null;
  }

  return (
    <section className="py-24 bg-bg-void border-t border-border-hairline relative overflow-hidden">
      <div className="absolute inset-0 console-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Render Certifications */}
        {hasCerts && (
          <div className="border border-border-hairline bg-bg-surface p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2.5 text-signal font-mono text-xs font-bold uppercase pb-3 border-b border-border-hairline/60">
              <Shield className="w-4 h-4" />
              <span>// CERTIFICATIONS_CREDENTIALS.SYS</span>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex gap-2.5 items-center font-sans text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-data" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render Awards */}
        {hasAwards && (
          <div className="border border-border-hairline bg-bg-surface p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2.5 text-signal font-mono text-xs font-bold uppercase pb-3 border-b border-border-hairline/60">
              <Award className="w-4 h-4" />
              <span>// AWARDS_RECOGNITION.LOG</span>
            </div>
            <ul className="space-y-3">
              {awards.map((award, idx) => (
                <li key={idx} className="flex gap-2.5 items-center font-sans text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-data" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render Volunteer Experience */}
        {hasVolunteer && (
          <div className="border border-border-hairline bg-bg-surface p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2.5 text-signal font-mono text-xs font-bold uppercase pb-3 border-b border-border-hairline/60">
              <Heart className="w-4 h-4" />
              <span>// VOLUNTEER_ACTIVITIES.LOG</span>
            </div>
            <ul className="space-y-3">
              {volunteerExperience.map((vol, idx) => (
                <li key={idx} className="flex gap-2.5 items-center font-sans text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-data" />
                  <span>{vol}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render Leadership & Community */}
        {hasLeadership && (
          <div className="border border-border-hairline bg-bg-surface p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2.5 text-signal font-mono text-xs font-bold uppercase pb-3 border-b border-border-hairline/60">
              <Users className="w-4 h-4" />
              <span>// LEADERSHIP_COMMUNITY.SYS</span>
            </div>
            <ul className="space-y-3">
              {leadershipCommunity.map((leader, idx) => (
                <li key={idx} className="flex gap-2.5 items-center font-sans text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-data" />
                  <span>{leader}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}
