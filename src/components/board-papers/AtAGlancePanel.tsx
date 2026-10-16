import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AtAGlance, normaliseAtAGlance } from '@/lib/boardPaperContent';

interface Props {
  value?: AtAGlance;
  onChange?: (value: AtAGlance) => void;
}

/** Human-authored only; a single presentation shared by all board pack views. */
const AtAGlancePanel = ({ value, onChange }: Props) => {
  const data = normaliseAtAGlance(value);
  const messages = data.key_messages.filter((v) => v.trim());
  const asks = data.board_asks.filter((v) => v.trim());
  if (!onChange && !data.conclusion.trim() && !messages.length && !asks.length) return null;

  const groups = [
    { key: 'key_messages' as const, label: 'Key messages', limit: 220, placeholder: 'A key message for the Board, in your own words.' },
    { key: 'board_asks' as const, label: 'The Board is asked to', limit: 160, placeholder: 'A decision or action requested from the Board.' },
  ];

  return (
    <div className="bp-at-a-glance space-y-4 rounded-md border p-4 text-base">
      <h3 className="bp-at-a-glance-heading text-lg font-bold">At a glance</h3>
      {onChange ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="glance-conclusion" className="text-base">Overall conclusion</Label>
            <Textarea id="glance-conclusion" rows={3} value={data.conclusion} className="text-base" placeholder="Your overall conclusion in one or two sentences." onChange={(e) => onChange({ ...data, conclusion: e.target.value })} />
          </div>
          {groups.map((group) => (
            <fieldset key={group.key} className="min-w-0 space-y-2">
              <legend className="mb-2 text-base font-medium">{group.label}</legend>
              {[0, 1, 2].map((index) => (
                <Input key={index} aria-label={`${group.label} ${index + 1}`} maxLength={group.limit} value={data[group.key][index] ?? ''} placeholder={group.placeholder} className="text-base" onChange={(e) => {
                  const values = Array.from({ length: 3 }, (_, i) => data[group.key][i] ?? '');
                  values[index] = e.target.value;
                  onChange({ ...data, [group.key]: values });
                }} />
              ))}
            </fieldset>
          ))}
        </>
      ) : (
        <>
          {data.conclusion.trim() && <div><p className="font-semibold">Overall conclusion</p><p className="whitespace-pre-wrap break-words leading-relaxed">{data.conclusion}</p></div>}
          {groups.map((group) => {
            const items = group.key === 'key_messages' ? messages : asks;
            return items.length ? <div key={group.key}><p className="font-semibold">{group.label}</p><ul className="list-disc space-y-1 pl-5">{items.map((text, i) => <li key={i} className="whitespace-pre-wrap break-words">{text}</li>)}</ul></div> : null;
          })}
        </>
      )}
    </div>
  );
};

export default AtAGlancePanel;