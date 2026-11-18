import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import type { SettingAddress } from "@/types/setting.interface";

function formatAddress(address?: SettingAddress) {
  if (!address) return "";

  const text = (value?: string) => value?.trim() ?? "";
  const street = [text(address.line1), text(address.line2)].filter(Boolean).join(", ");
  const city = [text(address.postalCode), text(address.city)].filter(Boolean).join(" ");
  const region = text(address.state) ? `(${text(address.state)})` : "";
  const locality = [city, region].filter(Boolean).join(" ");

  return [street, locality].filter(Boolean).join(", ");
}

export default function ClientContactInformation({
  email,
  phone,
  whatsApp,
  address,
}: {
  email: string;
  phone: string;
  whatsApp: string;
  address?: SettingAddress;
}) {
  const addressLine = formatAddress(address);
  const phoneHref = phone.replace(/\s/g, "");
  const whatsAppNumber = whatsApp.replace(/\D/g, "");

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Information</h2>
      <ul className="mt-8 space-y-6">
        {email ? (
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <a href={`mailto:${email}`} className="text-sm text-slate-700 hover:text-slate-900">
                {email}
              </a>
            </div>
          </li>
        ) : null}

        {phone ? (
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <a href={`tel:${phoneHref}`} className="text-sm text-slate-700 hover:text-slate-900">
                {phone}
              </a>
            </div>
          </li>
        ) : null}

        {whatsApp ? (
          <li className="flex items-start gap-3">
            <MessageSquare className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">WhatsApp</p>
              {whatsAppNumber ? (
                <a
                  href={`https://wa.me/${whatsAppNumber}`}
                  className="text-sm text-slate-700 hover:text-slate-900"
                >
                  {whatsApp}
                </a>
              ) : (
                <p className="text-sm text-slate-700">{whatsApp}</p>
              )}
            </div>
          </li>
        ) : null}

        {addressLine ? (
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
            <div>
              <p className="text-sm text-slate-500">Address</p>
              <p className="text-sm text-slate-700">{addressLine}</p>
            </div>
          </li>
        ) : null}

        <li className="flex items-start gap-3">
          <Clock className="mt-0.5 size-4 shrink-0 text-slate-400" />
          <div>
            <p className="text-sm text-slate-500">Hours</p>
            <p className="text-sm text-slate-700">Mon–Fri 9:00–18:00</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
