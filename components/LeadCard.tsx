import type { Lead } from '@/lib/types';

interface LeadCardProps {
  lead: Lead;
  averageRating?: number | null;
  totalRatings?: number;
  showRating?: boolean;
}

export function LeadCard({ lead, averageRating, totalRatings, showRating = false }: LeadCardProps) {
  const getScoreClass = (score: number | null | undefined) => {
    if (score === null || score === undefined) return '';
    if (score >= 7) return 'score-hot';
    if (score >= 4) return 'score-warm';
    return 'score-cold';
  };

  const getHotnessLabel = (score: number | null | undefined) => {
    if (score === null || score === undefined) return '';
    if (score >= 9) return '🔥 SCORCHING HOT!';
    if (score >= 7) return '🔥 HOT!';
    if (score >= 5) return '😐 Lukewarm';
    if (score >= 3) return '❄️ Cold';
    return '🥶 ICE COLD';
  };

  return (
    <div className="retro-panel max-w-lg mx-auto">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 -mx-2 -mt-2 mb-3">
        <h2 className="text-lg font-bold">{lead.companyName}</h2>
        <div className="text-xs text-gray-300">{lead.industry}</div>
      </div>

      {/* Lead Details */}
      <div className="retro-panel-inset mb-3">
        <table className="w-full text-xs">
          <tbody>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2 w-28">Contact:</td>
              <td className="py-1">{lead.contactName}</td>
            </tr>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2">Email:</td>
              <td className="py-1">
                <a href={`mailto:${lead.contactEmail}`} className="retro-link">
                  {lead.contactEmail}
                </a>
              </td>
            </tr>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2">Phone:</td>
              <td className="py-1">{lead.contactPhone}</td>
            </tr>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2">Company Size:</td>
              <td className="py-1">{lead.companySize}</td>
            </tr>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2">Interest:</td>
              <td className="py-1 font-bold text-green-700">{lead.productInterest}</td>
            </tr>
            <tr>
              <td className="font-bold text-gray-600 py-1 pr-2">Website:</td>
              <td className="py-1">
                <a
                  href={`https://${lead.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-link"
                >
                  {lead.website}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rating Display */}
      {showRating && averageRating !== null && averageRating !== undefined && (
        <div className="text-center border-t border-gray-300 pt-3">
          <div className="text-xs text-gray-600 mb-1">Current Rating:</div>
          <div className={`text-3xl ${getScoreClass(averageRating)}`}>
            {averageRating.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">
            ({totalRatings} {totalRatings === 1 ? 'vote' : 'votes'})
          </div>
          <div className={`text-sm mt-1 ${getScoreClass(averageRating)}`}>
            {getHotnessLabel(averageRating)}
          </div>
        </div>
      )}
    </div>
  );
}
