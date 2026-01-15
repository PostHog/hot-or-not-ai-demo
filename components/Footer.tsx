export function Footer() {
  return (
    <footer className="bg-gray-200 border-t-2 border-gray-400 mt-8 py-4 text-center text-[10px] text-gray-600">
      <div className="max-w-4xl mx-auto px-4">
        {/* Visitor counter */}
        <div className="mb-3">
          <span className="text-gray-700">Visitors: </span>
          <span className="visitor-counter">
            {String(Math.floor(Math.random() * 900000) + 100000).padStart(7, '0')}
          </span>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-2 mb-3 flex-wrap">
          <a href="#" className="retro-link">Rate Leads</a>
          <span>|</span>
          <a href="#" className="retro-link">FAQ</a>
          <span>|</span>
          <a href="#" className="retro-link">Submit Your Lead</a>
          <span>|</span>
          <a href="#" className="retro-link">Contact Us</a>
          <span>|</span>
          <a href="#" className="retro-link">Add us to your site</a>
        </div>

        {/* Best viewed notice */}
        <div className="mb-2 text-gray-500">
          Best viewed in Netscape Navigator 4.0 or Internet Explorer 5.0 at 800x600
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-2">
          © 2002-2002 Hot or Not Leads, Inc.
          <br />
          All rights reserved. <a href="#" className="retro-link">Trademark and copyright notice</a>
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-4 mt-3">
          <div className="retro-panel text-[8px] px-2 py-1">
            Made with ♥ and ColdFusion
          </div>
          <div className="retro-panel text-[8px] px-2 py-1">
            Y2K Compliant ✓
          </div>
          <div className="retro-panel text-[8px] px-2 py-1">
            No Flash Required
          </div>
        </div>
      </div>
    </footer>
  );
}
