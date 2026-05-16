import require$$0, { ref, shallowRef, defineComponent, markRaw, h as h$2, computed, onMounted, watch, onBeforeUnmount, provide, onUnmounted, Fragment, reactive, createSSRApp, watchEffect, pushScopeId, popScopeId, nextTick, openBlock, createElementBlock, normalizeClass, renderSlot, normalizeProps, guardReactiveProps, createBlock, resolveComponent, withKeys, normalizeStyle, createElementVNode, createCommentVNode, mergeProps, withCtx, createVNode, withScopeId, createApp, toDisplayString } from "vue";
import require$$1 from "@vue/shared";
import require$$2 from "@vue/compiler-ssr";
import require$$3 from "node:stream";
import { createHeadManager, router, config as config$1, isUrlMethodPair, formDataToObject, mergeDataIntoQueryString, getScrollableParent, useInfiniteScroll, UseFormUtils, FormComponentResetSymbol, resetFormFields, shouldIntercept, shouldNavigate, getInitialPageFromDOM, setupProgress } from "@inertiajs/core";
import { escape as escape$1, cloneDeep, has, set as set$2, get as get$3, isEqual } from "lodash-es";
import { createValidator, toSimpleValidationErrors, resolveName } from "laravel-precognition";
import createServer from "@inertiajs/core/server";
import { createPinia } from "pinia";
import { getOverflowAncestors, offset as offset$1, autoPlacement, shift, flip, arrow, size, computePosition } from "@floating-ui/dom";
const Accept$5 = "Akzeptieren";
const Accepted$5 = "Akzeptiert";
const Action$5 = "Aktion";
const Actions$5 = "Aktionen";
const Add$5 = "Hinzufügen";
const Admin$5 = "Administrator";
const Agree$5 = "Zustimmen";
const Archive$5 = "Archiv";
const Assign$5 = "Zuordnen";
const Associate$5 = "Assoziieren";
const Attach$5 = "Anhängen";
const Browse$5 = "Durchsuchen";
const Cancel$5 = "Abbrechen";
const Choose$5 = "Wählen Sie";
const Close$5 = "Schließen";
const Collapse$5 = "Zusammenklappen";
const Comment$5 = "Kommentar";
const Confirm$5 = "Bestätigen";
const Conflict$5 = "Konflikt";
const Connect$5 = "Verbinden";
const Continue$5 = "Weiter";
const Create$5 = "Erstellen";
const Created$5 = "Erstellt";
const Dashboard$5 = "Dashboard";
const Delete$5 = "Löschen";
const Detach$5 = "Trennen";
const Details$5 = "Details";
const Disable$5 = "Deaktivieren";
const Discard$5 = "Verwerfen";
const Done$5 = "Erledigt";
const Down$5 = "Runter";
const Duplicate$5 = "Duplizieren";
const Edit$5 = "Bearbeiten";
const Email$5 = "E-Mail";
const email$5 = ":Attribute muss eine gültige E-Mail-Adresse sein.";
const Enable$5 = "Aktivieren";
const errors$5 = "Fehler";
const Expand$5 = "Erweitern";
const Explanation$5 = "Erläuterung";
const Export$5 = "Exportieren";
const File$5 = "Datei";
const Files$5 = "Dateien";
const Forbidden$5 = "Verboten";
const Found$5 = "Gefunden";
const Gone$5 = "Nicht mehr verfügbar";
const Hide$5 = "Verstecken";
const Home$5 = "Startseite";
const Image$5 = "Bild";
const Impersonate$5 = "Imitieren";
const Impersonation$5 = "Identitätswechsel";
const Import$5 = "Importieren";
const Introduction$5 = "Einführung";
const Like$5 = "Wie";
const Load$5 = "Belastung";
const Localize$5 = "Lokalisieren";
const Location$5 = "Standort";
const Locked$5 = "Gesperrt";
const Login$5 = "Anmelden";
const Logout$5 = "Abmelden";
const Name$5 = "Name";
const name$5 = "name";
const New$5 = "Neu";
const No$5 = "Keine";
const of$5 = "von";
const OK$5 = "OK";
const Open$5 = "Offen";
const Password$5 = "Passwort";
const password$5 = "Das Passwort ist falsch.";
const Preview$5 = "Vorschau";
const Price$5 = "Preis";
const Processing$5 = "In Bearbeitung";
const Profile$5 = "Profil";
const Record$5 = "Aufzeichnen";
const Register$5 = "Registrieren";
const Restore$5 = "Wiederherstellen";
const results$5 = "Ergebnissen";
const Save$5 = "Speichern";
const Search$5 = "Suchen";
const Select$5 = "Wählen Sie";
const Send$5 = "Schicken";
const Settings$5 = "Einstellungen";
const Show$5 = "Zeigen";
const Showing$5 = "Zeige";
const Solve$5 = "Lösen";
const Start$5 = "Starten";
const Stop$5 = "Stoppen";
const Submit$5 = "Einreichen";
const Subscribe$5 = "Abonnieren";
const Switch$5 = "Wechseln";
const Tag$5 = "Stichwort";
const Tags$5 = "Stichworte";
const to$6 = "bis";
const Translate$5 = "Übersetzen";
const Unauthorized$5 = "Nicht autorisiert";
const Unpack$5 = "Auspacken";
const Unsubscribe$5 = "Abbestellen";
const Up$5 = "Hoch";
const Update$5 = "Aktualisieren";
const User$5 = "Benutzer";
const View$5 = "Ansicht";
const Yes$5 = "Ja";
const de$1 = {
  "(and :count more error)": "(und :count weiterer Fehler)",
  "(and :count more errors)": "(und :count weiterer Fehler)|(und :count weitere Fehler)|(und :count weitere Fehler)",
  "A decryption key is required.": "Ein Entschlüsselungsschlüssel ist nötig.",
  "A new verification link has been sent to the email address you provided during registration.": "Ein neuer Bestätigungslink wurde an die E-Mail-Adresse gesendet, die Sie bei der Registrierung angegeben haben.",
  "A new verification link has been sent to your email address.": "Ein neuer Bestätigungslink wurde an Ihre E-Mail-Adresse versendet.",
  "A Timeout Occurred": "Eine Zeitüberschreitung ist aufgetreten",
  Accept: Accept$5,
  Accepted: Accepted$5,
  Action: Action$5,
  Actions: Actions$5,
  Add: Add$5,
  "Add :name": ":name hinzufügen",
  Admin: Admin$5,
  Agree: Agree$5,
  "All rights reserved.": "Alle Rechte vorbehalten.",
  "Already registered?": "Bereits registriert?",
  "Already Reported": "Bereits gemeldet",
  Archive: Archive$5,
  "Are you sure you want to delete your account?": "Möchten Sie Ihr Konto wirklich löschen?",
  Assign: Assign$5,
  Associate: Associate$5,
  Attach: Attach$5,
  "Bad Gateway": "Fehlerhaftes Gateway",
  "Bad Request": "Ungültige Anfrage",
  "Bandwidth Limit Exceeded": "Bandbreitenlimit überschritten",
  Browse: Browse$5,
  Cancel: Cancel$5,
  Choose: Choose$5,
  "Choose :name": "Wählen Sie :name",
  "Choose File": "Datei wählen",
  "Choose Image": "Bild wählen",
  "Click here to re-send the verification email.": "Klicke hier, um eine neue Verifizierungs-E-Mail zu erhalten.",
  "Click to copy": "Klicken Sie zum Kopieren",
  "Client Closed Request": "Client hat die Anfrage geschlossen",
  Close: Close$5,
  Collapse: Collapse$5,
  "Collapse All": "Alle zusammenklappen",
  Comment: Comment$5,
  Confirm: Confirm$5,
  "Confirm Password": "Passwort bestätigen",
  Conflict: Conflict$5,
  Connect: Connect$5,
  "Connection Closed Without Response": "Verbindung ohne Antwort getrennt",
  "Connection Timed Out": "Verbindungszeit überschritten",
  Continue: Continue$5,
  Create: Create$5,
  "Create :name": ":name erstellen",
  Created: Created$5,
  "Current Password": "Derzeitiges Passwort",
  Dashboard: Dashboard$5,
  Delete: Delete$5,
  "Delete :name": ":name löschen",
  "Delete Account": "Account löschen",
  Detach: Detach$5,
  Details: Details$5,
  Disable: Disable$5,
  Discard: Discard$5,
  Done: Done$5,
  Down: Down$5,
  Duplicate: Duplicate$5,
  "Duplicate :name": ":name duplizieren",
  Edit: Edit$5,
  "Edit :name": ":name bearbeiten",
  Email: Email$5,
  email: email$5,
  "Email Password Reset Link": "Link zum Zurücksetzen des Passwortes zusenden",
  Enable: Enable$5,
  "Encrypted environment file already exists.": "Verschlüsselte Umgebungsdatei ist bereits vorhanden.",
  "Encrypted environment file not found.": "Verschlüsselte Umgebungsdatei nicht gefunden.",
  "Ensure your account is using a long, random password to stay secure.": "Stellen Sie sicher, dass Ihr Konto ein langes, zufälliges Passwort verwendet, um die Sicherheit zu gewährleisten.",
  "Environment file already exists.": "Umgebungsdatei ist bereits vorhanden.",
  "Environment file not found.": "Umgebungsdatei nicht gefunden.",
  errors: errors$5,
  Expand: Expand$5,
  "Expand All": "Alle erweitern",
  "Expectation Failed": "Erwartung gescheitert",
  Explanation: Explanation$5,
  Export: Export$5,
  "Export :name": ":name exportieren",
  "Failed Dependency": "Fehlgeschlagene Abhängigkeit",
  File: File$5,
  Files: Files$5,
  Forbidden: Forbidden$5,
  "Forgot your password?": "Passwort vergessen?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Haben Sie Ihr Passwort vergessen? Kein Problem. Teilen Sie uns einfach Ihre E-Mail-Adresse mit und wir senden Ihnen per E-Mail einen Link zum Zurücksetzen des Passworts, über den Sie ein Neues auswählen können.",
  Found: Found$5,
  "Gateway Timeout": "Gateway-Zeitüberschreitung",
  "Go Home": "Zur Startseite",
  "Go to page :page": "Gehe zur Seite :page",
  Gone: Gone$5,
  "Hello!": "Hallo!",
  Hide: Hide$5,
  "Hide :name": ":name ausblenden",
  Home: Home$5,
  "HTTP Version Not Supported": "HTTP Version nicht unterstützt",
  "I'm a teapot": "Ich bin eine Teekanne",
  "If you did not create an account, no further action is required.": "Wenn Sie kein Konto erstellt haben, sind keine weiteren Handlungen nötig.",
  "If you did not request a password reset, no further action is required.": "Wenn Sie kein Zurücksetzen des Passworts beantragt haben, sind keine weiteren Handlungen nötig.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Sollten Sie Schwierigkeiten haben, die Schaltfläche ":actionText" zu klicken, kopieren Sie den nachfolgenden Link\n in Ihre Adresszeile des Browsers.',
  "IM Used": "IM verwendet",
  Image: Image$5,
  Impersonate: Impersonate$5,
  Impersonation: Impersonation$5,
  Import: Import$5,
  "Import :name": "Importieren Sie :name",
  "Insufficient Storage": "Nicht genügend Speicherplatz",
  "Internal Server Error": "Interner Serverfehler",
  Introduction: Introduction$5,
  "Invalid filename.": "Ungültiger Dateiname.",
  "Invalid JSON was returned from the route.": "Von der Route wurde ein ungültiger JSON-Code zurückgegeben.",
  "Invalid SSL Certificate": "Ungültiges SSL-Zertifikat",
  "Length Required": "Längenangabe erforderlich",
  Like: Like$5,
  Load: Load$5,
  Localize: Localize$5,
  Location: Location$5,
  Locked: Locked$5,
  "Log In": "Einloggen",
  "Log in": "Einloggen",
  "Log Out": "Abmelden",
  Login: Login$5,
  Logout: Logout$5,
  "Loop Detected": "Endlosschleife erkannt",
  "Maintenance Mode": "Wartungsmodus",
  "Method Not Allowed": "Methode nicht erlaubt",
  "Misdirected Request": "Fehlgeleitete Anfrage",
  "Moved Permanently": "Permanent verschoben",
  "Multi-Status": "Multistatus",
  "Multiple Choices": "Mehrere Auswahlmöglichkeiten",
  Name: Name$5,
  name: name$5,
  "Network Authentication Required": "Netzwerkauthentifizierung erforderlich",
  "Network Connect Timeout Error": "Zeitüberschreitungsfehler bei Netzwerkverbindung",
  "Network Read Timeout Error": "Zeitüberschreitungsfehler beim Lesen des Netzwerks",
  New: New$5,
  "New :name": "Neu :name",
  "New Password": "Neues Passwort",
  No: No$5,
  "No Content": "Kein Inhalt",
  "Non-Authoritative Information": "Nicht maßgebende Informationen",
  "Not Acceptable": "Nicht akzeptierbar",
  "Not Extended": "Nicht erweitert",
  "Not Found": "Nicht gefunden",
  "Not Implemented": "Nicht implementiert",
  "Not Modified": "Nicht modifiziert",
  of: of$5,
  OK: OK$5,
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Sobald Ihr Konto gelöscht wurde, werden alle Ressourcen und Daten dauerhaft gelöscht. Laden Sie vor dem Löschen Ihres Kontos alle Daten oder Informationen herunter, die Sie behalten möchten.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Sobald Ihr Konto gelöscht wurde, werden alle Ressourcen und Daten dauerhaft gelöscht. Bitte geben Sie Ihr Passwort zur Bestätigung ein, dass Sie Ihr Konto dauerhaft löschen möchten.",
  Open: Open$5,
  "Open in a current window": "In einem aktuellen Fenster öffnen",
  "Open in a new window": "In einem neuen Fenster öffnen",
  "Open in a parent frame": "In einem übergeordneten Frame öffnen",
  "Open in the topmost frame": "Im obersten Rahmen öffnen",
  "Open on the website": "Auf der Website öffnen",
  "Origin Is Unreachable": "Quelle ist nicht erreichbar",
  "Page Expired": "Seite abgelaufen",
  "Pagination Navigation": "Seiten-Navigation",
  "Partial Content": "Teilinhalt",
  Password: Password$5,
  password: password$5,
  "Payload Too Large": "Nutzlast zu groß",
  "Payment Required": "Zahlung erforderlich",
  "Permanent Redirect": "Permanente Weiterleitung",
  "Please click the button below to verify your email address.": "Bitte klicken Sie auf die Schaltfläche, um Ihre E-Mail-Adresse zu bestätigen.",
  "Precondition Failed": "Vorbedingung fehlgeschlagen",
  "Precondition Required": "Voraussetzung erforderlich",
  Preview: Preview$5,
  Price: Price$5,
  Processing: Processing$5,
  Profile: Profile$5,
  "Profile Information": "Profilinformationen",
  "Proxy Authentication Required": "Proxy-Authentifizierung erforderlich",
  "Railgun Error": "Railgun-Fehler",
  "Range Not Satisfiable": "Bereich nicht erfüllbar",
  Record: Record$5,
  "Regards,": "Mit freundlichen Grüßen,",
  Register: Register$5,
  "Remember me": "Angemeldet bleiben",
  "Request Header Fields Too Large": "Anfrage-Header-Felder zu groß",
  "Request Timeout": "Zeitüberschreitung der Anfrage",
  "Resend Verification Email": "Bestätigungslink erneut senden",
  "Reset Content": "Inhalt zurücksetzen",
  "Reset Password": "Passwort zurücksetzen",
  "Reset Password Notification": "Benachrichtigung zum Zurücksetzen des Passworts",
  Restore: Restore$5,
  "Restore :name": ":name wiederherstellen",
  results: results$5,
  "Retry With": "Wiederhole mit",
  Save: Save$5,
  "Save & Close": "Speichern und schließen",
  "Save & Return": "Speichern und zurückgeben",
  "Save :name": "Sparen Sie :name",
  "Saved.": "Gespeichert.",
  Search: Search$5,
  "Search :name": "Suche :name",
  "See Other": "Siehe andere Seite",
  Select: Select$5,
  "Select All": "Wählen Sie Alle",
  Send: Send$5,
  "Server Error": "Interner Fehler",
  "Service Unavailable": "Service nicht verfügbar",
  "Session Has Expired": "Sitzung ist abgelaufen",
  Settings: Settings$5,
  Show: Show$5,
  "Show :name": ":name anzeigen",
  "Show All": "Zeige alles",
  Showing: Showing$5,
  "Sign In": "Anmelden",
  Solve: Solve$5,
  "SSL Handshake Failed": "SSL Handshake fehlgeschlagen",
  Start: Start$5,
  Stop: Stop$5,
  Submit: Submit$5,
  Subscribe: Subscribe$5,
  Switch: Switch$5,
  "Switch To Role": "Zur Rolle wechseln",
  "Switching Protocols": "Protokollwechsel",
  Tag: Tag$5,
  Tags: Tags$5,
  "Temporary Redirect": "Temporäre Weiterleitung",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "Vielen Dank für Ihre Registrierung! Bevor Sie loslegen, möchten wir Sie bitten Ihre E-Mail-Adresse zu verifizieren, indem Sie auf den Link klicken, den wir Ihnen per E-Mail zugeschickt haben. Wenn Sie die E-Mail nicht erhalten haben, senden wir Ihnen gerne eine weitere zu.",
  "The given data was invalid.": "Die gegebenen Daten waren ungültig.",
  "The response is not a streamed response.": "Die Antwort ist keine gestreamte Antwort.",
  "The response is not a view.": "Die Antwort ist keine Ansicht.",
  "This action is unauthorized.": "Diese Aktion ist nicht autorisiert.",
  "This is a secure area of the application. Please confirm your password before continuing.": "Dies ist ein sicherer Bereich der Anwendung. Bitte geben Sie Ihr Passwort ein, bevor Sie fortfahren.",
  "This password reset link will expire in :count minutes.": "Dieser Link zum Zurücksetzen des Passworts läuft in :count Minuten ab.",
  to: to$6,
  "Toggle navigation": "Navigation umschalten",
  "Too Early": "Zu früh",
  "Too Many Requests": "Zu viele Anfragen",
  Translate: Translate$5,
  "Translate It": "Übersetze es",
  Unauthorized: Unauthorized$5,
  "Unavailable For Legal Reasons": "Aus rechtlichen Gründen nicht verfügbar",
  "Unknown Error": "Unbekannter Fehler",
  Unpack: Unpack$5,
  "Unprocessable Entity": "Unverarbeitbare Entität",
  Unsubscribe: Unsubscribe$5,
  "Unsupported Media Type": "Nicht unterstützter Medientyp",
  Up: Up$5,
  Update: Update$5,
  "Update :name": ":name aktualisieren",
  "Update Password": "Passwort aktualisieren",
  "Update your account's profile information and email address.": "Aktualisieren Sie die Profilinformationen und die E-Mail-Adresse Ihres Kontos.",
  "Upgrade Required": "Upgrade erforderlich",
  "URI Too Long": "URI ist zu lang",
  "Use Proxy": "Proxy verwenden",
  User: User$5,
  "Variant Also Negotiates": "Variante verhandelt ebenfalls",
  "Verify Email Address": "E-Mail-Adresse bestätigen",
  View: View$5,
  "View :name": "Ansicht :name",
  "Web Server is Down": "Webserver ist ausgefallen",
  "Whoops!": "Ups!",
  Yes: Yes$5,
  "You are receiving this email because we received a password reset request for your account.": "Sie erhalten diese E-Mail, weil wir einen Antrag auf eine Zurücksetzung Ihres Passworts bekommen haben.",
  "You're logged in!": "Sie sind eingeloggt!",
  "Your email address is unverified.": "Ihre E-Mail-Adresse ist nicht verifiziert."
};
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept: Accept$5,
  Accepted: Accepted$5,
  Action: Action$5,
  Actions: Actions$5,
  Add: Add$5,
  Admin: Admin$5,
  Agree: Agree$5,
  Archive: Archive$5,
  Assign: Assign$5,
  Associate: Associate$5,
  Attach: Attach$5,
  Browse: Browse$5,
  Cancel: Cancel$5,
  Choose: Choose$5,
  Close: Close$5,
  Collapse: Collapse$5,
  Comment: Comment$5,
  Confirm: Confirm$5,
  Conflict: Conflict$5,
  Connect: Connect$5,
  Continue: Continue$5,
  Create: Create$5,
  Created: Created$5,
  Dashboard: Dashboard$5,
  Delete: Delete$5,
  Detach: Detach$5,
  Details: Details$5,
  Disable: Disable$5,
  Discard: Discard$5,
  Done: Done$5,
  Down: Down$5,
  Duplicate: Duplicate$5,
  Edit: Edit$5,
  Email: Email$5,
  Enable: Enable$5,
  Expand: Expand$5,
  Explanation: Explanation$5,
  Export: Export$5,
  File: File$5,
  Files: Files$5,
  Forbidden: Forbidden$5,
  Found: Found$5,
  Gone: Gone$5,
  Hide: Hide$5,
  Home: Home$5,
  Image: Image$5,
  Impersonate: Impersonate$5,
  Impersonation: Impersonation$5,
  Import: Import$5,
  Introduction: Introduction$5,
  Like: Like$5,
  Load: Load$5,
  Localize: Localize$5,
  Location: Location$5,
  Locked: Locked$5,
  Login: Login$5,
  Logout: Logout$5,
  Name: Name$5,
  New: New$5,
  No: No$5,
  OK: OK$5,
  Open: Open$5,
  Password: Password$5,
  Preview: Preview$5,
  Price: Price$5,
  Processing: Processing$5,
  Profile: Profile$5,
  Record: Record$5,
  Register: Register$5,
  Restore: Restore$5,
  Save: Save$5,
  Search: Search$5,
  Select: Select$5,
  Send: Send$5,
  Settings: Settings$5,
  Show: Show$5,
  Showing: Showing$5,
  Solve: Solve$5,
  Start: Start$5,
  Stop: Stop$5,
  Submit: Submit$5,
  Subscribe: Subscribe$5,
  Switch: Switch$5,
  Tag: Tag$5,
  Tags: Tags$5,
  Translate: Translate$5,
  Unauthorized: Unauthorized$5,
  Unpack: Unpack$5,
  Unsubscribe: Unsubscribe$5,
  Up: Up$5,
  Update: Update$5,
  User: User$5,
  View: View$5,
  Yes: Yes$5,
  default: de$1,
  email: email$5,
  errors: errors$5,
  name: name$5,
  of: of$5,
  password: password$5,
  results: results$5,
  to: to$6
}, Symbol.toStringTag, { value: "Module" }));
const Accept$4 = "Accept";
const Accepted$4 = "Accepted";
const Action$4 = "Action";
const Actions$4 = "Actions";
const Active$2 = "Active";
const Add$4 = "Add";
const Admin$4 = "Admin";
const Agree$4 = "Agree";
const Alias$2 = "Alias";
const Apply$2 = "Apply";
const Archive$4 = "Archive";
const Assign$4 = "Assign";
const Associate$4 = "Associate";
const Attach$4 = "Attach";
const Back$2 = "Back";
const Birthday$2 = "Birthday";
const Bonuses$2 = "Bonuses";
const Browse$4 = "Browse";
const Buy$2 = "Buy";
const Cancel$4 = "Cancel";
const Catalog$2 = "Catalog";
const Categories$2 = "Categories";
const Category$2 = "Category";
const Checkout$2 = "Checkout";
const Choose$4 = "Choose";
const City$2 = "City";
const Close$4 = "Close";
const Code$2 = "Code";
const Collapse$4 = "Collapse";
const Comment$4 = "Comment";
const Commerce$2 = "Commerce";
const Configuration$2 = "Configuration";
const Confirm$4 = "Confirm";
const Conflict$4 = "Conflict";
const Connect$4 = "Connect";
const Contacts$2 = "Contacts";
const Continue$4 = "Continue";
const Country$2 = "Country";
const Create$4 = "Create";
const Created$4 = "Created";
const Dashboard$4 = "Dashboard";
const Delete$4 = "Delete";
const Detach$4 = "Detach";
const Details$4 = "Details";
const Disable$4 = "Disable";
const Disabled$2 = "Disabled";
const Discard$4 = "Discard";
const Done$4 = "Done";
const Down$4 = "Down";
const Draft$2 = "Draft";
const Duplicate$4 = "Duplicate";
const Edit$4 = "Edit";
const Email$4 = "Email";
const Enable$4 = "Enable";
const Expand$4 = "Expand";
const Explanation$4 = "Explanation";
const Export$4 = "Export";
const Fee$2 = "Fee";
const File$4 = "File";
const Files$4 = "Files";
const Finish$2 = "Finish";
const Forbidden$4 = "Forbidden";
const Found$4 = "Found";
const Free$2 = "Free";
const Gender$2 = "Gender";
const General$2 = "General";
const Gone$4 = "Gone";
const Hide$4 = "Hide";
const Home$4 = "Home";
const ID$2 = "ID";
const Image$4 = "Image";
const Impersonate$4 = "Impersonate";
const Impersonation$4 = "Impersonation";
const Import$4 = "Import";
const Introduction$4 = "Introduction";
const Items$2 = "Items";
const Language$2 = "Language";
const LastName$2 = "LastName";
const Like$4 = "Like";
const Load$4 = "Load";
const Localize$4 = "Localize";
const Location$4 = "Location";
const Locked$4 = "Locked";
const Login$4 = "Login";
const Logo$2 = "Logo";
const Logout$4 = "Logout";
const Manufacturer$2 = "Manufacturer";
const Manufacturers$2 = "Manufacturers";
const Media$2 = "Media";
const Messages$2 = "Messages";
const Name$4 = "Name";
const New$4 = "New";
const No$4 = "No";
const OK$4 = "OK";
const Open$4 = "Open";
const Order$2 = "Order";
const Orders$2 = "Orders";
const Pages$2 = "Pages";
const Parent$2 = "Parent";
const Password$4 = "Password";
const Payment$2 = "Payment";
const Petrenko$2 = "Petrenko";
const Petro$2 = "Petro";
const Petrovych$2 = "Petrovych";
const Phone$2 = "Phone";
const Preview$4 = "Preview";
const Price$4 = "Price";
const Processing$4 = "Processing";
const Profile$4 = "Profile";
const Quantity$2 = "Quantity";
const Record$4 = "Record";
const Register$4 = "Register";
const Remove$2 = "Remove";
const Restore$4 = "Restore";
const Save$4 = "Save";
const Search$4 = "Search";
const Select$4 = "Select";
const Send$4 = "Send";
const Settings$4 = "Settings";
const Shipping$2 = "Shipping";
const Shippings$2 = "Shippings";
const Show$4 = "Show";
const Showing$4 = "Showing";
const Solve$4 = "Solve";
const Start$4 = "Start";
const Status$2 = "Status";
const Stop$4 = "Stop";
const Submit$4 = "Submit";
const Subscribe$4 = "Subscribe";
const Subtotal$2 = "Subtotal";
const Summary$2 = "Summary";
const Switch$4 = "Switch";
const System$2 = "System";
const Tag$4 = "Tag";
const Tags$4 = "Tags";
const Title$2 = "Title";
const Total$2 = "Total";
const Translate$4 = "Translate";
const Translations$2 = "Translations";
const Unauthorized$4 = "Unauthorized";
const Unpack$4 = "Unpack";
const Unsubscribe$4 = "Unsubscribe";
const Up$4 = "Up";
const Update$4 = "Update";
const User$4 = "User";
const Users$2 = "Users";
const Version$2 = "Version";
const Versions$2 = "Versions";
const View$4 = "View";
const Warehouse$2 = "Warehouse";
const Warehouses$2 = "Warehouses";
const Yes$4 = "Yes";
const ava$2 = "ava";
const email$4 = "The :attribute field must be a valid email address.";
const errors$4 = "errors";
const female$2 = "female";
const inStoke$2 = "inStoke";
const male$2 = "male";
const name$4 = "name";
const of$4 = "of";
const other$2 = "other";
const password$4 = "The provided password is incorrect.";
const results$4 = "results";
const tasks$2 = "tasks";
const to$5 = "to";
const en = {
  "#ID": "#ID",
  "(and :count more error)": "(and :count more error)",
  "(and :count more errors)": "(and :count more error)|(and :count more errors)|(and :count more errors)",
  "A Timeout Occurred": "A Timeout Occurred",
  "A decryption key is required.": "A decryption key is required.",
  "A new verification link has been sent to the email address you provided during registration.": "A new verification link has been sent to the email address you provided during registration.",
  "A new verification link has been sent to your email address.": "A new verification link has been sent to your email address.",
  "About you": "About you",
  Accept: Accept$4,
  Accepted: Accepted$4,
  Action: Action$4,
  Actions: Actions$4,
  Active: Active$2,
  Add: Add$4,
  "Add :name": "Add :name",
  "Add Method": "Add Method",
  "Add some fertilizers to start your order": "Add some fertilizers to start your order",
  Admin: Admin$4,
  Agree: Agree$4,
  Alias: Alias$2,
  "All rights reserved": "All rights reserved",
  "All rights reserved.": "All rights reserved.",
  "Already Reported": "Already Reported",
  "Already registered?": "Already registered?",
  "Another recipient": "Another recipient",
  Apply: Apply$2,
  Archive: Archive$4,
  "Are you sure you want to delete this element?": "Are you sure you want to delete this element?",
  "Are you sure you want to delete this payment method?": "Are you sure you want to delete this payment method?",
  "Are you sure you want to delete this?": "Are you sure you want to delete this?",
  "Are you sure you want to delete your account?": "Are you sure you want to delete your account?",
  Assign: Assign$4,
  Associate: Associate$4,
  Attach: Attach$4,
  "Available bonuses": "Available bonuses",
  Back: Back$2,
  "Bad Gateway": "Bad Gateway",
  "Bad Request": "Bad Request",
  "Bandwidth Limit Exceeded": "Bandwidth Limit Exceeded",
  Birthday: Birthday$2,
  "Bonus Balance": "Bonus Balance",
  Bonuses: Bonuses$2,
  Browse: Browse$4,
  Buy: Buy$2,
  Cancel: Cancel$4,
  "Cart is empty": "Cart is empty",
  Catalog: Catalog$2,
  Categories: Categories$2,
  Category: Category$2,
  Checkout: Checkout$2,
  Choose: Choose$4,
  "Choose :name": "Choose :name",
  "Choose File": "Choose File",
  "Choose Image": "Choose Image",
  City: City$2,
  "Click here to re-send the verification email.": "Click here to re-send the verification email.",
  "Click to copy": "Click to copy",
  "Click to upload": "Click to upload",
  "Client Closed Request": "Client Closed Request",
  Close: Close$4,
  Code: Code$2,
  Collapse: Collapse$4,
  "Collapse All": "Collapse All",
  Comment: Comment$4,
  Commerce: Commerce$2,
  "Commission Percent (%)": "Commission Percent (%)",
  Configuration: Configuration$2,
  Confirm: Confirm$4,
  "Confirm Order": "Confirm Order",
  "Confirm Password": "Confirm Password",
  Conflict: Conflict$4,
  Connect: Connect$4,
  "Connection Closed Without Response": "Connection Closed Without Response",
  "Connection Timed Out": "Connection Timed Out",
  "Contact Information": "Contact Information",
  Contacts: Contacts$2,
  Continue: Continue$4,
  "Continue Shopping": "Continue Shopping",
  Country: Country$2,
  Create: Create$4,
  "Create :name": "Create :name",
  "Create Payment Method": "Create Payment Method",
  Created: Created$4,
  "Current Password": "Current Password",
  Dashboard: Dashboard$4,
  "Date": "Date",
  Delete: Delete$4,
  "Delete :name": "Delete :name",
  "Delete Account": "Delete Account",
  "Department №1, str. Main...": "Department №1, str. Main...",
  Detach: Detach$4,
  Details: Details$4,
  Disable: Disable$4,
  Disabled: Disabled$2,
  Discard: Discard$4,
  "Display Order": "Display Order",
  Done: Done$4,
  Down: Down$4,
  Draft: Draft$2,
  Duplicate: Duplicate$4,
  "Duplicate :name": "Duplicate :name",
  Edit: Edit$4,
  "Edit :name": "Edit :name",
  "Edit Profile": "Edit Profile",
  Email: Email$4,
  "Email Password Reset Link": "Email Password Reset Link",
  "Email складу": "Email складу",
  Enable: Enable$4,
  "Encrypted environment file already exists.": "Encrypted environment file already exists.",
  "Encrypted environment file not found.": "Encrypted environment file not found.",
  "Ensure your account is using a long, random password to stay secure.": "Ensure your account is using a long, random password to stay secure.",
  "Enter your last name": "Enter your last name",
  "Enter your name": "Enter your name",
  "Environment file already exists.": "Environment file already exists.",
  "Environment file not found.": "Environment file not found.",
  Expand: Expand$4,
  "Expand All": "Expand All",
  "Expectation Failed": "Expectation Failed",
  Explanation: Explanation$4,
  Export: Export$4,
  "Export :name": "Export :name",
  "Failed Dependency": "Failed Dependency",
  Fee: Fee$2,
  File: File$4,
  Files: Files$4,
  "Fill in your details or login": "Fill in your details or login",
  Finish: Finish$2,
  "First Name": "First Name",
  "Fixed Fee (Amount)": "Fixed Fee (Amount)",
  Forbidden: Forbidden$4,
  "Forgot your password?": "Forgot your password?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.",
  Found: Found$4,
  Free: Free$2,
  "Full Name": "Full Name",
  "Gateway Timeout": "Gateway Timeout",
  Gender: Gender$2,
  General: General$2,
  "General Data": "General Data",
  "Go Home": "Go Home",
  "Go to Checkout": "Go to Checkout",
  "Go to page :page": "Go to page :page",
  Gone: Gone$4,
  "HTTP Version Not Supported": "HTTP Version Not Supported",
  "Have an account?": "Have an account?",
  "Hello!": "Hello!",
  Hide: Hide$4,
  "Hide :name": "Hide :name",
  Home: Home$4,
  "I'm a teapot": "I'm a teapot",
  ID: ID$2,
  "IM Used": "IM Used",
  "If you did not create an account, no further action is required.": "If you did not create an account, no further action is required.",
  "If you did not request a password reset, no further action is required.": "If you did not request a password reset, no further action is required.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': `If you're having trouble clicking the ":actionText" button, copy and paste the URL below
into your web browser:`,
  Image: Image$4,
  Impersonate: Impersonate$4,
  Impersonation: Impersonation$4,
  Import: Import$4,
  "Import :name": "Import :name",
  "In Cart": "In Cart",
  "In Progress": "In Progress",
  "Insufficient Storage": "Insufficient Storage",
  "Internal Server Error": "Internal Server Error",
  Introduction: Introduction$4,
  "Invalid JSON was returned from the route.": "Invalid JSON was returned from the route.",
  "Invalid SSL Certificate": "Invalid SSL Certificate",
  "Invalid filename.": "Invalid filename.",
  "Inventory Overview": "Inventory Overview",
  "Inventory Value": "Inventory Value",
  Items: Items$2,
  Language: Language$2,
  "Last Name": "Last Name",
  "Last name": "Last name",
  LastName: LastName$2,
  "Latest Updates": "Latest Updates",
  "Length Required": "Length Required",
  Like: Like$4,
  Load: Load$4,
  Localize: Localize$4,
  "Localized Content": "Localized Content",
  Location: Location$4,
  Locked: Locked$4,
  "Log In": "Log In",
  "Log Out": "Log Out",
  "Log in": "Log in",
  "Log out": "Log out",
  Login: Login$4,
  Logo: Logo$2,
  Logout: Logout$4,
  "Loop Detected": "Loop Detected",
  "Maintenance Mode": "Maintenance Mode",
  "Manage general product info and public status.": "Manage general product info and public status.",
  "Manage how your customers can pay for orders.": "Manage how your customers can pay for orders.",
  Manufacturer: Manufacturer$2,
  Manufacturers: Manufacturers$2,
  Media: Media$2,
  Messages: Messages$2,
  "Method Not Allowed": "Method Not Allowed",
  "Method Status": "Method Status",
  "Method is hidden from storefront": "Method is hidden from storefront",
  "Middle Name": "Middle Name",
  "Misdirected Request": "Misdirected Request",
  "Moved Permanently": "Moved Permanently",
  "Multi-Status": "Multi-Status",
  "Multiple Choices": "Multiple Choices",
  Name: Name$4,
  "Network Authentication Required": "Network Authentication Required",
  "Network Connect Timeout Error": "Network Connect Timeout Error",
  "Network Read Timeout Error": "Network Read Timeout Error",
  New: New$4,
  "New :name": "New :name",
  "New Password": "New Password",
  "New Payment Method": "New Payment Method",
  "Next step": "Next step",
  No: No$4,
  "No Content": "No Content",
  "No items found": "No items found",
  "No payment methods found.": "No payment methods found.",
  "No version history available": "No version history available",
  "No versions found": "No versions found",
  "Non-Authoritative Information": "Non-Authoritative Information",
  "Not Acceptable": "Not Acceptable",
  "Not Extended": "Not Extended",
  "Not Found": "Not Found",
  "Not Implemented": "Not Implemented",
  "Not Modified": "Not Modified",
  OK: OK$4,
  "Old Price": "Old Price",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
  Open: Open$4,
  "Open in a current window": "Open in a current window",
  "Open in a new window": "Open in a new window",
  "Open in a parent frame": "Open in a parent frame",
  "Open in the topmost frame": "Open in the topmost frame",
  "Open on the website": "Open on the website",
  Order: Order$2,
  "Order Summary": "Order Summary",
  Orders: Orders$2,
  "Origin Is Unreachable": "Origin Is Unreachable",
  "Out of stock": "Out of stock",
  "Page Expired": "Page Expired",
  Pages: Pages$2,
  "Pagination Navigation": "Pagination Navigation",
  Parent: Parent$2,
  "Parent category": "Parent category",
  "Partial Content": "Partial Content",
  Password: Password$4,
  "Payload Too Large": "Payload Too Large",
  Payment: Payment$2,
  "Payment Methods": "Payment Methods",
  "Payment Required": "Payment Required",
  "Permanent Redirect": "Permanent Redirect",
  "Personal Information": "Personal Information",
  Petrenko: Petrenko$2,
  "Petrenko Petro": "Petrenko Petro",
  Petro: Petro$2,
  Petrovych: Petrovych$2,
  Phone: Phone$2,
  "Plan (Roadmap)": "Plan (Roadmap)",
  "Please click the button below to verify your email address.": "Please click the button below to verify your email address.",
  "Plus Code": "Plus Code",
  "Precondition Failed": "Precondition Failed",
  "Precondition Required": "Precondition Required",
  Preview: Preview$4,
  Price: Price$4,
  "Private (Hidden)": "Private (Hidden)",
  Processing: Processing$4,
  "Processing...": "Processing...",
  Profile: Profile$4,
  "Profile Information": "Profile Information",
  "Proxy Authentication Required": "Proxy Authentication Required",
  "Public (Visible)": "Public (Visible)",
  Quantity: Quantity$2,
  "Railgun Error": "Railgun Error",
  "Range Not Satisfiable": "Range Not Satisfiable",
  "Recent Orders": "Recent Orders",
  "Recipient Last Name": "Recipient Last Name",
  "Recipient Name": "Recipient Name",
  "Recipient Phone": "Recipient Phone",
  Record: Record$4,
  "Ref Міста": "Ref Міста",
  "Ref Області": "Ref Області",
  "Ref Району": "Ref Району",
  "Regards,": "Regards,",
  Register: Register$4,
  "Release / Roadmap Progress": "Release / Roadmap Progress",
  "Remember me": "Remember me",
  Remove: Remove$2,
  "Request Header Fields Too Large": "Request Header Fields Too Large",
  "Request Timeout": "Request Timeout",
  "Resend Verification Email": "Resend Verification Email",
  "Reset Content": "Reset Content",
  "Reset Password": "Reset Password",
  "Reset Password Notification": "Reset Password Notification",
  Restore: Restore$4,
  "Restore :name": "Restore :name",
  "Retry With": "Retry With",
  "Roadmap & versions": "Roadmap & versions",
  "SSL Handshake Failed": "SSL Handshake Failed",
  Save: Save$4,
  "Save & Close": "Save & Close",
  "Save & Return": "Save & Return",
  "Save :name": "Save :name",
  "Save Changes": "Save Changes",
  "Save Settings": "Save Settings",
  "Saved.": "Saved.",
  "Saving...": "Saving...",
  Search: Search$4,
  "Search :name": "Search :name",
  "Search city...": "Search city...",
  "Secure encrypted checkout": "Secure encrypted checkout",
  "See Other": "See Other",
  Select: Select$4,
  "Select All": "Select All",
  "Select city first": "Select city first",
  "Select how you want to receive your order": "Select how you want to receive your order",
  "Select warehouse...": "Select warehouse...",
  "Select your preferred payment method": "Select your preferred payment method",
  Send: Send$4,
  "Server Error": "Server Error",
  "Service Unavailable": "Service Unavailable",
  "Session Has Expired": "Session Has Expired",
  Settings: Settings$4,
  Shipping: Shipping$2,
  "Shipping Details": "Shipping Details",
  Shippings: Shippings$2,
  "Shopping Cart": "Shopping Cart",
  Show: Show$4,
  "Show :name": "Show :name",
  "Show All": "Show All",
  Showing: Showing$4,
  "Sign In": "Sign In",
  Solve: Solve$4,
  "Sort order": "Sort order",
  Start: Start$4,
  "Start Shopping": "Start Shopping",
  Status: Status$2,
  "Stock Alert": "Stock Alert",
  Stop: Stop$4,
  Submit: Submit$4,
  Subscribe: Subscribe$4,
  Subtotal: Subtotal$2,
  Summary: Summary$2,
  Switch: Switch$4,
  "Switch To Role": "Switch To Role",
  "Switching Protocols": "Switching Protocols",
  System: System$2,
  "System Code": "System Code",
  Tag: Tag$4,
  Tags: Tags$4,
  "Technical Configuration": "Technical Configuration",
  "Temporary Redirect": "Temporary Redirect",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.",
  "The given data was invalid.": "The given data was invalid.",
  "The response is not a streamed response.": "The response is not a streamed response.",
  "The response is not a view.": "The response is not a view.",
  "This action is unauthorized.": "This action is unauthorized.",
  "This is a secure area of the application. Please confirm your password before continuing.": "This is a secure area of the application. Please confirm your password before continuing.",
  "This password reset link will expire in :count minutes.": "This password reset link will expire in :count minutes.",
  Title: Title$2,
  "To Catalog": "To Catalog",
  "Toggle navigation": "Toggle navigation",
  "Too Early": "Too Early",
  "Too Many Requests": "Too Many Requests",
  Total: Total$2,
  "Total amount": "Total amount",
  Translate: Translate$4,
  "Translate It": "Translate It",
  Translations: Translations$2,
  "URI Too Long": "URI Too Long",
  Unauthorized: Unauthorized$4,
  "Unavailable For Legal Reasons": "Unavailable For Legal Reasons",
  "Unknown Error": "Unknown Error",
  Unpack: Unpack$4,
  "Unprocessable Entity": "Unprocessable Entity",
  Unsubscribe: Unsubscribe$4,
  "Unsupported Media Type": "Unsupported Media Type",
  Up: Up$4,
  Update: Update$4,
  "Update :name": "Update :name",
  "Update Password": "Update Password",
  "Update your account's profile information and email address.": "Update your account's profile information and email address.",
  "Upgrade Required": "Upgrade Required",
  "Use Proxy": "Use Proxy",
  User: User$4,
  Users: Users$2,
  "Variant Also Negotiates": "Variant Also Negotiates",
  "Verify Email Address": "Verify Email Address",
  Version: Version$2,
  Versions: Versions$2,
  View: View$4,
  "View :name": "View :name",
  "View Cart": "View Cart",
  "View Full Roadmap & History": "View Full Roadmap & History",
  Warehouse: Warehouse$2,
  "Warehouse / Delivery Address": "Warehouse / Delivery Address",
  "Warehouse/Address": "Warehouse/Address",
  Warehouses: Warehouses$2,
  "Web Server is Down": "Web Server is Down",
  "Whoops!": "Whoops!",
  "Work hours": "Work hours",
  Yes: Yes$4,
  "You are receiving this email because we received a password reset request for your account.": "You are receiving this email because we received a password reset request for your account.",
  "You're logged in!": "You're logged in!",
  "Your Cart": "Your Cart",
  "Your Selection": "Your Selection",
  "Your cart is empty": "Your cart is empty",
  "Your email address is unverified.": "Your email address is unverified.",
  "active this month": "active this month",
  ava: ava$2,
  email: email$4,
  errors: errors$4,
  female: female$2,
  "for faster checkout.": "for faster checkout.",
  inStoke: inStoke$2,
  male: male$2,
  name: name$4,
  of: of$4,
  "or drag and drop": "or drag and drop",
  other: other$2,
  password: password$4,
  "phone number": "phone number",
  "public": "public",
  results: results$4,
  tasks: tasks$2,
  to: to$5,
  "Інформація": "Інформація",
  "Інша": "Інша",
  "Історія замовлень": "Історія замовлень",
  "Адреса": "Адреса",
  "Активний": "Активний",
  "Бонусний рахунок": "Бонусний рахунок",
  "Введіть місто та № відділення": "Введіть місто та № відділення",
  "Виберіть місто...": "Виберіть місто...",
  "Вийти": "Вийти",
  "Вулиця та номер": "Вулиця та номер",
  "Відключений": "Відключений",
  "Графік": "Графік",
  "Графік роботи": "Графік роботи",
  "Дані для водіїв та клієнтів на мові": "Дані для водіїв та клієнтів на мові",
  "Дата народження": "Дата народження",
  "Жіноча": "Жіноча",
  "Завершити": "Завершити",
  "Зберегти зміни": "Зберегти зміни",
  "Зберігаємо...": "Зберігаємо...",
  "Знайти": "Знайти",
  "Кабінет": "Кабінет",
  "Контакти": "Контакти",
  "Контактний телефон": "Контактний телефон",
  "Локалізація": "Локалізація",
  "Методів доставки не знайдено": "Методів доставки не знайдено",
  "Місто / Населений пункт": "Місто / Населений пункт",
  "Назва": "Назва",
  "Назва для клієнтів...": "Назва для клієнтів...",
  "Назва складу": "Назва складу",
  "Наприклад: Центральний склад (Львів)": "Наприклад: Центральний склад (Львів)",
  "Опис / Орієнтири": "Опис / Орієнтири",
  "Орієнтири": "Орієнтири",
  "Особисті дані": "Особисті дані",
  "Оформлення замовлення": "Оформлення замовлення",
  "Перейти до покупок": "Перейти до покупок",
  "Пн-Пт: 09:00 - 18:00": "Пн-Пт: 09:00 - 18:00",
  "Порядок сортування": "Порядок сортування",
  "Посилання на Google Maps (URL)": "Посилання на Google Maps (URL)",
  "Редагувати": "Редагувати",
  "Синхронізація з логістикою (Refs)": "Синхронізація з логістикою (Refs)",
  "Системний код (ID)": "Системний код (ID)",
  "Склад / Локація": "Склад / Локація",
  "Статус": "Статус",
  "Статус складу": "Статус складу",
  "Стать": "Стать",
  "Телефон": "Телефон",
  "У вас поки немає замовлень": "У вас поки немає замовлень",
  "Увійти": "Увійти",
  "Чоловіча": "Чоловіча",
  "або": "або",
  "вул. Промислова, 10": "вул. Промислова, 10"
};
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept: Accept$4,
  Accepted: Accepted$4,
  Action: Action$4,
  Actions: Actions$4,
  Active: Active$2,
  Add: Add$4,
  Admin: Admin$4,
  Agree: Agree$4,
  Alias: Alias$2,
  Apply: Apply$2,
  Archive: Archive$4,
  Assign: Assign$4,
  Associate: Associate$4,
  Attach: Attach$4,
  Back: Back$2,
  Birthday: Birthday$2,
  Bonuses: Bonuses$2,
  Browse: Browse$4,
  Buy: Buy$2,
  Cancel: Cancel$4,
  Catalog: Catalog$2,
  Categories: Categories$2,
  Category: Category$2,
  Checkout: Checkout$2,
  Choose: Choose$4,
  City: City$2,
  Close: Close$4,
  Code: Code$2,
  Collapse: Collapse$4,
  Comment: Comment$4,
  Commerce: Commerce$2,
  Configuration: Configuration$2,
  Confirm: Confirm$4,
  Conflict: Conflict$4,
  Connect: Connect$4,
  Contacts: Contacts$2,
  Continue: Continue$4,
  Country: Country$2,
  Create: Create$4,
  Created: Created$4,
  Dashboard: Dashboard$4,
  Delete: Delete$4,
  Detach: Detach$4,
  Details: Details$4,
  Disable: Disable$4,
  Disabled: Disabled$2,
  Discard: Discard$4,
  Done: Done$4,
  Down: Down$4,
  Draft: Draft$2,
  Duplicate: Duplicate$4,
  Edit: Edit$4,
  Email: Email$4,
  Enable: Enable$4,
  Expand: Expand$4,
  Explanation: Explanation$4,
  Export: Export$4,
  Fee: Fee$2,
  File: File$4,
  Files: Files$4,
  Finish: Finish$2,
  Forbidden: Forbidden$4,
  Found: Found$4,
  Free: Free$2,
  Gender: Gender$2,
  General: General$2,
  Gone: Gone$4,
  Hide: Hide$4,
  Home: Home$4,
  ID: ID$2,
  Image: Image$4,
  Impersonate: Impersonate$4,
  Impersonation: Impersonation$4,
  Import: Import$4,
  Introduction: Introduction$4,
  Items: Items$2,
  Language: Language$2,
  LastName: LastName$2,
  Like: Like$4,
  Load: Load$4,
  Localize: Localize$4,
  Location: Location$4,
  Locked: Locked$4,
  Login: Login$4,
  Logo: Logo$2,
  Logout: Logout$4,
  Manufacturer: Manufacturer$2,
  Manufacturers: Manufacturers$2,
  Media: Media$2,
  Messages: Messages$2,
  Name: Name$4,
  New: New$4,
  No: No$4,
  OK: OK$4,
  Open: Open$4,
  Order: Order$2,
  Orders: Orders$2,
  Pages: Pages$2,
  Parent: Parent$2,
  Password: Password$4,
  Payment: Payment$2,
  Petrenko: Petrenko$2,
  Petro: Petro$2,
  Petrovych: Petrovych$2,
  Phone: Phone$2,
  Preview: Preview$4,
  Price: Price$4,
  Processing: Processing$4,
  Profile: Profile$4,
  Quantity: Quantity$2,
  Record: Record$4,
  Register: Register$4,
  Remove: Remove$2,
  Restore: Restore$4,
  Save: Save$4,
  Search: Search$4,
  Select: Select$4,
  Send: Send$4,
  Settings: Settings$4,
  Shipping: Shipping$2,
  Shippings: Shippings$2,
  Show: Show$4,
  Showing: Showing$4,
  Solve: Solve$4,
  Start: Start$4,
  Status: Status$2,
  Stop: Stop$4,
  Submit: Submit$4,
  Subscribe: Subscribe$4,
  Subtotal: Subtotal$2,
  Summary: Summary$2,
  Switch: Switch$4,
  System: System$2,
  Tag: Tag$4,
  Tags: Tags$4,
  Title: Title$2,
  Total: Total$2,
  Translate: Translate$4,
  Translations: Translations$2,
  Unauthorized: Unauthorized$4,
  Unpack: Unpack$4,
  Unsubscribe: Unsubscribe$4,
  Up: Up$4,
  Update: Update$4,
  User: User$4,
  Users: Users$2,
  Version: Version$2,
  Versions: Versions$2,
  View: View$4,
  Warehouse: Warehouse$2,
  Warehouses: Warehouses$2,
  Yes: Yes$4,
  ava: ava$2,
  default: en,
  email: email$4,
  errors: errors$4,
  female: female$2,
  inStoke: inStoke$2,
  male: male$2,
  name: name$4,
  of: of$4,
  other: other$2,
  password: password$4,
  results: results$4,
  tasks: tasks$2,
  to: to$5
}, Symbol.toStringTag, { value: "Module" }));
const Accept$3 = "Aceptar";
const Accepted$3 = "Aceptado";
const Action$3 = "Acción";
const Actions$3 = "Acciones";
const Add$3 = "Añadir";
const Admin$3 = "Administrar";
const Agree$3 = "Aceptar";
const Archive$3 = "Archivar";
const Assign$3 = "Asignar";
const Associate$3 = "Asociar";
const Attach$3 = "Adjuntar";
const Browse$3 = "Navegar";
const Cancel$3 = "Cancelar";
const Choose$3 = "Elija";
const Close$3 = "Cerrar";
const Collapse$3 = "Colapsar";
const Comment$3 = "Comentar";
const Confirm$3 = "Confirmar";
const Conflict$3 = "Conflicto";
const Connect$3 = "Conectar";
const Continue$3 = "Continuar";
const Create$3 = "Crear";
const Created$3 = "Creado";
const Dashboard$3 = "Panel";
const Delete$3 = "Eliminar";
const Detach$3 = "Desvincular";
const Details$3 = "Detalles";
const Disable$3 = "Deshabilitar";
const Discard$3 = "Descartar";
const Done$3 = "Hecho";
const Down$3 = "Abajo";
const Duplicate$3 = "Duplicar";
const Edit$3 = "Editar";
const Email$3 = "Correo electrónico";
const email$3 = "El campo :attribute no es un correo válido.";
const Enable$3 = "Habilitar";
const errors$3 = "errores";
const Expand$3 = "Expandir";
const Explanation$3 = "Explicación";
const Export$3 = "Exportar";
const File$3 = "Archivo";
const Files$3 = "Archivos";
const Forbidden$3 = "Prohibido";
const Found$3 = "Encontrado";
const Gone$3 = "Recurso no disponible";
const Hide$3 = "Ocultar";
const Home$3 = "Inicio";
const Image$3 = "Imagen";
const Impersonate$3 = "Personificar";
const Impersonation$3 = "Personificación";
const Import$3 = "Importar";
const Introduction$3 = "Introducción";
const Like$3 = "Me gusta";
const Load$3 = "Cargar";
const Localize$3 = "Localizar";
const Location$3 = "Ubicación";
const Locked$3 = "Bloqueado";
const Login$3 = "Iniciar sesión";
const Logout$3 = "Finalizar sesión";
const Name$3 = "Nombre";
const name$3 = "nombre";
const New$3 = "Nuevo";
const No$3 = "No";
const of$3 = "de";
const OK$3 = "Correcto";
const Open$3 = "Abrir";
const Password$3 = "Contraseña";
const password$3 = "La contraseña es incorrecta.";
const Preview$3 = "Previsualizar";
const Price$3 = "Precio";
const Processing$3 = "Procesando";
const Profile$3 = "Perfil";
const Record$3 = "Registro";
const Register$3 = "Registrarse";
const Restore$3 = "Restaurar";
const results$3 = "resultados";
const Save$3 = "Guardar";
const Search$3 = "Buscar";
const Select$3 = "Seleccione";
const Send$3 = "Enviar";
const Settings$3 = "Ajustes";
const Show$3 = "Mostrar";
const Showing$3 = "Mostrando";
const Solve$3 = "Resolver";
const Start$3 = "Comenzar";
const Stop$3 = "Detener";
const Submit$3 = "Enviar";
const Subscribe$3 = "Suscriba";
const Switch$3 = "Cambiar";
const Tag$3 = "Etiqueta";
const Tags$3 = "Etiquetas";
const to$4 = "al";
const Translate$3 = "Traducir";
const Unauthorized$3 = "No autorizado";
const Unpack$3 = "Desglosar";
const Unsubscribe$3 = "Darse de baja";
const Up$3 = "Arriba";
const Update$3 = "Actualizar";
const User$3 = "Usuario";
const View$3 = "Ver";
const Yes$3 = "Sí";
const es = {
  "(and :count more error)": "(y :count error más)",
  "(and :count more errors)": "(y :count error más)|(y :count errores más)|(y :count errores más)",
  "A decryption key is required.": "Se requiere una clave de descifrado.",
  "A new verification link has been sent to the email address you provided during registration.": "Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.",
  "A new verification link has been sent to your email address.": "Se ha enviado un nuevo enlace de verificación a su dirección de correo electrónico.",
  "A Timeout Occurred": "Se produjo un tiempo de espera",
  Accept: Accept$3,
  Accepted: Accepted$3,
  Action: Action$3,
  Actions: Actions$3,
  Add: Add$3,
  "Add :name": "Agregar :name",
  Admin: Admin$3,
  Agree: Agree$3,
  "All rights reserved.": "Todos los derechos reservados.",
  "Already registered?": "¿Ya se registró?",
  "Already Reported": "Ya Reportado",
  Archive: Archive$3,
  "Are you sure you want to delete your account?": "¿Está seguro que desea eliminar su cuenta?",
  Assign: Assign$3,
  Associate: Associate$3,
  Attach: Attach$3,
  "Bad Gateway": "Mala puerta de enlace",
  "Bad Request": "Solicitud incorrecta",
  "Bandwidth Limit Exceeded": "Límite de ancho de banda excedido",
  Browse: Browse$3,
  Cancel: Cancel$3,
  Choose: Choose$3,
  "Choose :name": "Elegir :name",
  "Choose File": "Elija archivo",
  "Choose Image": "Elegir Imagen",
  "Click here to re-send the verification email.": "Haga clic aquí para reenviar el correo de verificación.",
  "Click to copy": "Haga clic para copiar",
  "Client Closed Request": "Solicitud cerrada del cliente",
  Close: Close$3,
  Collapse: Collapse$3,
  "Collapse All": "Colapsar todo",
  Comment: Comment$3,
  Confirm: Confirm$3,
  "Confirm Password": "Confirmar contraseña",
  Conflict: Conflict$3,
  Connect: Connect$3,
  "Connection Closed Without Response": "Conexión cerrada sin respuesta",
  "Connection Timed Out": "Tiempo de conexión agotado",
  Continue: Continue$3,
  Create: Create$3,
  "Create :name": "Crear :name",
  Created: Created$3,
  "Current Password": "Contraseña actual",
  Dashboard: Dashboard$3,
  Delete: Delete$3,
  "Delete :name": "Eliminar :name",
  "Delete Account": "Borrar cuenta",
  Detach: Detach$3,
  Details: Details$3,
  Disable: Disable$3,
  Discard: Discard$3,
  Done: Done$3,
  Down: Down$3,
  Duplicate: Duplicate$3,
  "Duplicate :name": "Duplicar :name",
  Edit: Edit$3,
  "Edit :name": "Editar :name",
  Email: Email$3,
  email: email$3,
  "Email Password Reset Link": "Enviar enlace para restablecer contraseña",
  Enable: Enable$3,
  "Encrypted environment file already exists.": "El archivo de entorno cifrado ya existe.",
  "Encrypted environment file not found.": "No se encontró el archivo de entorno cifrado.",
  "Ensure your account is using a long, random password to stay secure.": "Asegúrese que su cuenta esté usando una contraseña larga y aleatoria para mantenerse seguro.",
  "Environment file already exists.": "El archivo de entorno ya existe.",
  "Environment file not found.": "Archivo de entorno no encontrado.",
  errors: errors$3,
  Expand: Expand$3,
  "Expand All": "Expandir todo",
  "Expectation Failed": "Expectativa fallida",
  Explanation: Explanation$3,
  Export: Export$3,
  "Export :name": "Exportar :name",
  "Failed Dependency": "Dependencia fallida",
  File: File$3,
  Files: Files$3,
  Forbidden: Forbidden$3,
  "Forgot your password?": "¿Olvidó su contraseña?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "¿Olvidó su contraseña? No hay problema. Simplemente déjenos saber su dirección de correo electrónico y le enviaremos un enlace para restablecer la contraseña que le permitirá elegir una nueva.",
  Found: Found$3,
  "Gateway Timeout": "Tiempo de espera de puerta de enlace",
  "Go Home": "Ir a inicio",
  "Go to page :page": "Ir a la página :page",
  Gone: Gone$3,
  "Hello!": "¡Hola!",
  Hide: Hide$3,
  "Hide :name": "Ocultar :name",
  Home: Home$3,
  "HTTP Version Not Supported": "Versión HTTP no compatible",
  "I'm a teapot": "Soy una tetera",
  "If you did not create an account, no further action is required.": "Si no ha creado una cuenta, no se requiere ninguna acción adicional.",
  "If you did not request a password reset, no further action is required.": "Si no ha solicitado el restablecimiento de contraseña, omita este mensaje de correo electrónico.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Si está teniendo problemas al hacer clic en el botón ":actionText", copie y pegue la URL de abajo\nen su navegador web:',
  "IM Used": "IM usado",
  Image: Image$3,
  Impersonate: Impersonate$3,
  Impersonation: Impersonation$3,
  Import: Import$3,
  "Import :name": "Importar :name",
  "Insufficient Storage": "Espacio insuficiente",
  "Internal Server Error": "Error interno del servidor",
  Introduction: Introduction$3,
  "Invalid filename.": "Nombre de archivo no válido.",
  "Invalid JSON was returned from the route.": "Se devolvió un JSON no válido desde la ruta.",
  "Invalid SSL Certificate": "Certificado SSL no válido",
  "Length Required": "Longitud requerida",
  Like: Like$3,
  Load: Load$3,
  Localize: Localize$3,
  Location: Location$3,
  Locked: Locked$3,
  "Log In": "Iniciar sesión",
  "Log in": "Iniciar sesión",
  "Log Out": "Finalizar sesión",
  Login: Login$3,
  Logout: Logout$3,
  "Loop Detected": "Bucle detectado",
  "Maintenance Mode": "Modo de mantenimiento",
  "Method Not Allowed": "Método no permitido",
  "Misdirected Request": "Solicitud mal dirigida",
  "Moved Permanently": "Movido permanentemente",
  "Multi-Status": "Multiestado",
  "Multiple Choices": "Múltiples opciones",
  Name: Name$3,
  name: name$3,
  "Network Authentication Required": "Se requiere autenticación de red",
  "Network Connect Timeout Error": "Error de tiempo de espera de conexión de red",
  "Network Read Timeout Error": "Error de tiempo de espera de lectura de red",
  New: New$3,
  "New :name": "Nuevo :name",
  "New Password": "Nueva Contraseña",
  No: No$3,
  "No Content": "Sin contenido",
  "Non-Authoritative Information": "Información no autorizada",
  "Not Acceptable": "Inaceptable",
  "Not Extended": "no extendido",
  "Not Found": "No encontrado",
  "Not Implemented": "No se ha implementado",
  "Not Modified": "No modificado",
  of: of$3,
  OK: OK$3,
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán de forma permanente. Antes de borrar su cuenta, por favor descargue cualquier dato o información que desee conservar.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán de forma permanente. Ingrese su contraseña para confirmar que desea eliminar su cuenta de forma permanente.",
  Open: Open$3,
  "Open in a current window": "Abrir en una ventana actual",
  "Open in a new window": "Abrir en una ventana nueva",
  "Open in a parent frame": "Abrir en un marco principal",
  "Open in the topmost frame": "Abrir en el marco superior",
  "Open on the website": "Abrir en el sitio web",
  "Origin Is Unreachable": "El origen es inalcanzable",
  "Page Expired": "Página expirada",
  "Pagination Navigation": "Navegación por los enlaces de paginación",
  "Partial Content": "Contenido parcial",
  Password: Password$3,
  password: password$3,
  "Payload Too Large": "Solicitud demasiado grande",
  "Payment Required": "Pago requerido",
  "Permanent Redirect": "Redirección permanente",
  "Please click the button below to verify your email address.": "Por favor, haga clic en el botón de abajo para verificar su dirección de correo electrónico.",
  "Precondition Failed": "Error de condición previa",
  "Precondition Required": "Precondición requerida",
  Preview: Preview$3,
  Price: Price$3,
  Processing: Processing$3,
  Profile: Profile$3,
  "Profile Information": "Información de perfil",
  "Proxy Authentication Required": "Se requiere autenticación proxy",
  "Railgun Error": "Error de cañón de riel",
  "Range Not Satisfiable": "Rango no satisfactorio",
  Record: Record$3,
  "Regards,": "Saludos,",
  Register: Register$3,
  "Remember me": "Mantener sesión activa",
  "Request Header Fields Too Large": "Campos de encabezado de solicitud demasiado grandes",
  "Request Timeout": "Solicitud de tiempo de espera",
  "Resend Verification Email": "Reenviar correo de verificación",
  "Reset Content": "Restablecer contenido",
  "Reset Password": "Restablecer contraseña",
  "Reset Password Notification": "Notificación de restablecimiento de contraseña",
  Restore: Restore$3,
  "Restore :name": "Restaurar :name",
  results: results$3,
  "Retry With": "Reintentar con",
  Save: Save$3,
  "Save & Close": "Guardar y cerrar",
  "Save & Return": "Guardar y volver",
  "Save :name": "Guardar :name",
  "Saved.": "Guardado.",
  Search: Search$3,
  "Search :name": "Buscar :name",
  "See Other": "Ver otros",
  Select: Select$3,
  "Select All": "Seleccionar todo",
  Send: Send$3,
  "Server Error": "Error del servidor",
  "Service Unavailable": "Servicio no disponible",
  "Session Has Expired": "La sesión ha expirado",
  Settings: Settings$3,
  Show: Show$3,
  "Show :name": "Mostrar :name",
  "Show All": "Mostrar todo",
  Showing: Showing$3,
  "Sign In": "Iniciar sesión",
  Solve: Solve$3,
  "SSL Handshake Failed": "Protocolo de enlace SSL fallido",
  Start: Start$3,
  Stop: Stop$3,
  Submit: Submit$3,
  Subscribe: Subscribe$3,
  Switch: Switch$3,
  "Switch To Role": "Cambiar de rol",
  "Switching Protocols": "Protocolos de conmutación",
  Tag: Tag$3,
  Tags: Tags$3,
  "Temporary Redirect": "Redirección temporal",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "¡Gracias por registrarse! Antes de comenzar, ¿podría verificar su dirección de correo electrónico haciendo clic en el enlace que le acabamos de enviar? Si no recibió el correo electrónico, con gusto le enviaremos otro.",
  "The given data was invalid.": "Los datos proporcionados no son válidos.",
  "The response is not a streamed response.": "La respuesta no es una respuesta transmitida.",
  "The response is not a view.": "La respuesta no es una vista.",
  "This action is unauthorized.": "Esta acción no está autorizada.",
  "This is a secure area of the application. Please confirm your password before continuing.": "Esta es un área segura de la aplicación. Confirme su contraseña antes de continuar.",
  "This password reset link will expire in :count minutes.": "Este enlace de restablecimiento de contraseña expirará en :count minutos.",
  to: to$4,
  "Toggle navigation": "Alternar navegación",
  "Too Early": "Demasiado temprano",
  "Too Many Requests": "Demasiadas peticiones",
  Translate: Translate$3,
  "Translate It": "Traducirlo",
  Unauthorized: Unauthorized$3,
  "Unavailable For Legal Reasons": "No disponible por razones legales",
  "Unknown Error": "Error desconocido",
  Unpack: Unpack$3,
  "Unprocessable Entity": "Entidad no procesable",
  Unsubscribe: Unsubscribe$3,
  "Unsupported Media Type": "Tipo de medio no admitido",
  Up: Up$3,
  Update: Update$3,
  "Update :name": "Actualizar :name",
  "Update Password": "Actualizar contraseña",
  "Update your account's profile information and email address.": "Actualice la información de su cuenta y la dirección de correo electrónico.",
  "Upgrade Required": "Se requiere actualización",
  "URI Too Long": "URI demasiado largo",
  "Use Proxy": "Usa proxy",
  User: User$3,
  "Variant Also Negotiates": "Variante También Negocia",
  "Verify Email Address": "Confirme su correo electrónico",
  View: View$3,
  "View :name": "Ver :name",
  "Web Server is Down": "El servidor web está caído",
  "Whoops!": "¡Ups!",
  Yes: Yes$3,
  "You are receiving this email because we received a password reset request for your account.": "Ha recibido este mensaje porque se solicitó un restablecimiento de contraseña para su cuenta.",
  "You're logged in!": "¡Usted está conectado!",
  "Your email address is unverified.": "Su dirección de correo electrónico no está verificada."
};
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept: Accept$3,
  Accepted: Accepted$3,
  Action: Action$3,
  Actions: Actions$3,
  Add: Add$3,
  Admin: Admin$3,
  Agree: Agree$3,
  Archive: Archive$3,
  Assign: Assign$3,
  Associate: Associate$3,
  Attach: Attach$3,
  Browse: Browse$3,
  Cancel: Cancel$3,
  Choose: Choose$3,
  Close: Close$3,
  Collapse: Collapse$3,
  Comment: Comment$3,
  Confirm: Confirm$3,
  Conflict: Conflict$3,
  Connect: Connect$3,
  Continue: Continue$3,
  Create: Create$3,
  Created: Created$3,
  Dashboard: Dashboard$3,
  Delete: Delete$3,
  Detach: Detach$3,
  Details: Details$3,
  Disable: Disable$3,
  Discard: Discard$3,
  Done: Done$3,
  Down: Down$3,
  Duplicate: Duplicate$3,
  Edit: Edit$3,
  Email: Email$3,
  Enable: Enable$3,
  Expand: Expand$3,
  Explanation: Explanation$3,
  Export: Export$3,
  File: File$3,
  Files: Files$3,
  Forbidden: Forbidden$3,
  Found: Found$3,
  Gone: Gone$3,
  Hide: Hide$3,
  Home: Home$3,
  Image: Image$3,
  Impersonate: Impersonate$3,
  Impersonation: Impersonation$3,
  Import: Import$3,
  Introduction: Introduction$3,
  Like: Like$3,
  Load: Load$3,
  Localize: Localize$3,
  Location: Location$3,
  Locked: Locked$3,
  Login: Login$3,
  Logout: Logout$3,
  Name: Name$3,
  New: New$3,
  No: No$3,
  OK: OK$3,
  Open: Open$3,
  Password: Password$3,
  Preview: Preview$3,
  Price: Price$3,
  Processing: Processing$3,
  Profile: Profile$3,
  Record: Record$3,
  Register: Register$3,
  Restore: Restore$3,
  Save: Save$3,
  Search: Search$3,
  Select: Select$3,
  Send: Send$3,
  Settings: Settings$3,
  Show: Show$3,
  Showing: Showing$3,
  Solve: Solve$3,
  Start: Start$3,
  Stop: Stop$3,
  Submit: Submit$3,
  Subscribe: Subscribe$3,
  Switch: Switch$3,
  Tag: Tag$3,
  Tags: Tags$3,
  Translate: Translate$3,
  Unauthorized: Unauthorized$3,
  Unpack: Unpack$3,
  Unsubscribe: Unsubscribe$3,
  Up: Up$3,
  Update: Update$3,
  User: User$3,
  View: View$3,
  Yes: Yes$3,
  default: es,
  email: email$3,
  errors: errors$3,
  name: name$3,
  of: of$3,
  password: password$3,
  results: results$3,
  to: to$4
}, Symbol.toStringTag, { value: "Module" }));
const php_de = {
  "actions.accept": "Akzeptieren",
  "actions.action": "Aktion",
  "actions.actions": "Aktionen",
  "actions.add": "Hinzufügen",
  "actions.admin": "Administrator",
  "actions.agree": "Zustimmen",
  "actions.archive": "Archiv",
  "actions.assign": "Zuordnen",
  "actions.associate": "Assoziieren",
  "actions.attach": "Anfügen",
  "actions.browse": "Durchsuche",
  "actions.cancel": "Stornieren",
  "actions.choose": "Wählen",
  "actions.choose_file": "Datei wählen",
  "actions.choose_image": "Wählen Sie Bild",
  "actions.click_to_copy": "Klicken Sie zum Kopieren",
  "actions.close": "Schließen",
  "actions.collapse": "Zusammenbruch",
  "actions.collapse_all": "Alles reduzieren",
  "actions.comment": "Kommentar",
  "actions.confirm": "Bestätigen",
  "actions.connect": "Verbinden",
  "actions.create": "Erstellen",
  "actions.delete": "Löschen",
  "actions.detach": "Ablösen",
  "actions.details": "Einzelheiten",
  "actions.disable": "Deaktivieren",
  "actions.discard": "Verwerfen",
  "actions.done": "Erledigt",
  "actions.down": "Runter",
  "actions.duplicate": "Duplikat",
  "actions.edit": "Bearbeiten",
  "actions.enable": "Aktivieren",
  "actions.expand": "Expandieren",
  "actions.expand_all": "Alle erweitern",
  "actions.explanation": "Erläuterung",
  "actions.export": "Exportieren",
  "actions.file": "Datei",
  "actions.files": "Dateien",
  "actions.go_home": "Nach Hause gehen",
  "actions.hide": "Verstecken",
  "actions.home": "Heim",
  "actions.image": "Bild",
  "actions.impersonate": "Imitieren",
  "actions.impersonation": "Identitätswechsel",
  "actions.import": "Importieren",
  "actions.introduction": "Einführung",
  "actions.like": "Wie",
  "actions.load": "Belastung",
  "actions.localize": "Lokalisieren",
  "actions.log_in": "Anmeldung",
  "actions.log_out": "Ausloggen",
  "actions.named.add": ":name hinzufügen",
  "actions.named.choose": ":name auswählen",
  "actions.named.create": ":name erstellen",
  "actions.named.delete": ":name löschen",
  "actions.named.duplicate": ":name duplizieren",
  "actions.named.edit": ":name bearbeiten",
  "actions.named.export": ":name exportieren",
  "actions.named.hide": ":name ausblenden",
  "actions.named.import": ":name importieren",
  "actions.named.new": "Neu :name",
  "actions.named.restore": ":name wiederherstellen",
  "actions.named.save": ":name speichern",
  "actions.named.search": ":name suchen",
  "actions.named.show": ":name anzeigen",
  "actions.named.update": ":name aktualisieren",
  "actions.named.view": ":name anzeigen",
  "actions.new": "Neu",
  "actions.no": "Nein",
  "actions.open": "Öffen",
  "actions.open_website": "Auf der Website öffnen",
  "actions.preview": "Vorschau",
  "actions.price": "Preis",
  "actions.record": "Aufzeichnen",
  "actions.restore": "Wiederherstellen",
  "actions.save": "Speichern",
  "actions.save_and_close": "Speichern und schließen",
  "actions.save_and_return": "Speichern und zurückgehen",
  "actions.search": "Suchen",
  "actions.select": "Wählen",
  "actions.select_all": "Alles auswählen",
  "actions.send": "Absenden",
  "actions.settings": "Einstellungen",
  "actions.show": "Anzeigen",
  "actions.show_all": "Alles anzeigen",
  "actions.sign_in": "Anmelden",
  "actions.solve": "Lösen",
  "actions.start": "Starten",
  "actions.stop": "Stoppen",
  "actions.submit": "Absenden",
  "actions.subscribe": "Abonnieren",
  "actions.switch": "Umschalten",
  "actions.switch_to_role": "Zur Rolle wechseln",
  "actions.tag": "Schlagwort",
  "actions.tags": "Stichworte",
  "actions.target_link.blank": "In einem neuen Fenster öffnen",
  "actions.target_link.parent": "In einem übergeordneten Frame öffnen",
  "actions.target_link.self": "In einem aktuellen Fenster öffnen",
  "actions.target_link.top": "Im obersten Rahmen öffnen",
  "actions.translate": "Übersetzen",
  "actions.translate_it": "Übersetze es",
  "actions.unpack": "Entpacken",
  "actions.unsubscribe": "Abbestellen",
  "actions.up": "Hoch",
  "actions.update": "Aktualisieren",
  "actions.user": "Benutzer",
  "actions.view": "Ansicht",
  "actions.yes": "Ja",
  "auth.failed": "Diese Kombination aus Zugangsdaten wurde nicht in unserer Datenbank gefunden.",
  "auth.password": "Das Passwort ist falsch.",
  "auth.throttle": "Zu viele Loginversuche. Versuchen Sie es bitte in :seconds Sekunden nochmal.",
  "http-statuses.0": "Unbekannter Fehler",
  "http-statuses.100": "Weiter",
  "http-statuses.101": "Protokollwechsel",
  "http-statuses.102": "In Bearbeitung",
  "http-statuses.200": "OK",
  "http-statuses.201": "Erstellt",
  "http-statuses.202": "Akzeptiert",
  "http-statuses.203": "Nicht verifizierte Information",
  "http-statuses.204": "Kein Inhalt",
  "http-statuses.205": "Inhalt zurücksetzen",
  "http-statuses.206": "Teilinhalt",
  "http-statuses.207": "Multistatus",
  "http-statuses.208": "Bereits gemeldet",
  "http-statuses.226": "IM verwendet",
  "http-statuses.300": "Mehrere Auswahlmöglichkeiten",
  "http-statuses.301": "Permanent verschoben",
  "http-statuses.302": "Gefunden",
  "http-statuses.303": "Siehe andere Seite",
  "http-statuses.304": "Nicht modifiziert",
  "http-statuses.305": "Proxy verwenden",
  "http-statuses.307": "Temporäre Weiterleitung",
  "http-statuses.308": "Permanente Weiterleitung",
  "http-statuses.400": "Ungültige Anfrage",
  "http-statuses.401": "Nicht autorisiert",
  "http-statuses.402": "Zahlung erforderlich",
  "http-statuses.403": "Verboten",
  "http-statuses.404": "Nicht gefunden",
  "http-statuses.405": "Methode nicht erlaubt",
  "http-statuses.406": "Nicht annehmbar",
  "http-statuses.407": "Proxy-Authentifizierung erforderlich",
  "http-statuses.408": "Zeitüberschreitung der Anfrage",
  "http-statuses.409": "Konflikt",
  "http-statuses.410": "Nicht mehr verfügbar",
  "http-statuses.411": "Länge erforderlich",
  "http-statuses.412": "Vorbedingung fehlgeschlagen",
  "http-statuses.413": "Nutzlast zu groß",
  "http-statuses.414": "URI zu lang",
  "http-statuses.415": "Nicht unterstützter Medientyp",
  "http-statuses.416": "Bereich nicht erfüllbar",
  "http-statuses.417": "Erwartung gescheitert",
  "http-statuses.418": "Ich bin eine Teekanne",
  "http-statuses.419": "Sitzung ist abgelaufen",
  "http-statuses.421": "Fehlgeleitete Anfrage",
  "http-statuses.422": "Unverarbeitbare Entität",
  "http-statuses.423": "Gesperrt",
  "http-statuses.424": "Fehlgeschlagene Abhängigkeit",
  "http-statuses.425": "Zu früh",
  "http-statuses.426": "Upgrade erforderlich",
  "http-statuses.428": "Voraussetzung erforderlich",
  "http-statuses.429": "Zu viele Anfragen",
  "http-statuses.431": "Anfrage-Header-Felder zu groß",
  "http-statuses.444": "Verbindung ohne Antwort geschlossen",
  "http-statuses.449": "Wiederhole mit",
  "http-statuses.451": "Aus rechtlichen Gründen nicht verfügbar",
  "http-statuses.499": "Client-Closed-Request",
  "http-statuses.500": "Interner Serverfehler",
  "http-statuses.501": "Nicht implementiert",
  "http-statuses.502": "Fehlerhaftes Gateway",
  "http-statuses.503": "Wartungsmodus",
  "http-statuses.504": "Gateway-Zeitüberschreitung",
  "http-statuses.505": "HTTP Version nicht unterstützt",
  "http-statuses.506": "Variante verhandelt auch",
  "http-statuses.507": "Nicht genügend Speicherplatz",
  "http-statuses.508": "Endlosschleife erkannt",
  "http-statuses.509": "Bandbreitenlimit überschritten",
  "http-statuses.510": "Nicht erweitert",
  "http-statuses.511": "Netzwerkauthentifizierung erforderlich",
  "http-statuses.520": "Unbekannter Fehler",
  "http-statuses.521": "Webserver ist ausgefallen",
  "http-statuses.522": "Verbindung abgelaufen",
  "http-statuses.523": "Quelle ist nicht erreichbar",
  "http-statuses.524": "Eine Zeitüberschreitung ist aufgetreten",
  "http-statuses.525": "SSL Handshake fehlgeschlagen",
  "http-statuses.526": "Ungültiges SSL-Zertifikat",
  "http-statuses.527": "Railgun-Fehler",
  "http-statuses.598": "Zeitüberschreitungsfehler beim Lesen des Netzwerks",
  "http-statuses.599": "Zeitüberschreitungsfehler bei Netzwerkverbindung",
  "http-statuses.unknownError": "Unbekannter Fehler",
  "pagination.next": "Weiter &raquo;",
  "pagination.previous": "&laquo; Zurück",
  "passwords.reset": "Das Passwort wurde zurückgesetzt!",
  "passwords.sent": "E-Mail zum Zurücksetzen des Passworts wurde gesendet!",
  "passwords.throttled": "Bitte warten Sie, bevor Sie es erneut versuchen.",
  "passwords.token": "Der Passwort-Wiederherstellungsschlüssel ist ungültig oder abgelaufen.",
  "passwords.user": "Es konnte leider kein Nutzer mit dieser E-Mail-Adresse gefunden werden.",
  "validation.accepted": ":Attribute muss akzeptiert werden.",
  "validation.accepted_if": ":Attribute muss akzeptiert werden, wenn :other :value ist.",
  "validation.active_url": ":Attribute ist keine gültige Internet-Adresse.",
  "validation.after": ":Attribute muss ein Datum nach :date sein.",
  "validation.after_or_equal": ":Attribute muss ein Datum nach :date oder gleich :date sein.",
  "validation.alpha": ":Attribute darf nur aus Buchstaben bestehen.",
  "validation.alpha_dash": ":Attribute darf nur aus Buchstaben, Zahlen, Binde- und Unterstrichen bestehen.",
  "validation.alpha_num": ":Attribute darf nur aus Buchstaben und Zahlen bestehen.",
  "validation.any_of": ":Attribute ist ungültig.",
  "validation.array": ":Attribute muss ein Array sein.",
  "validation.ascii": "Die :attribute darf nur alphanumerische Single-Byte-Zeichen und -Symbole enthalten.",
  "validation.before": ":Attribute muss ein Datum vor :date sein.",
  "validation.before_or_equal": ":Attribute muss ein Datum vor :date oder gleich :date sein.",
  "validation.between.array": ":Attribute muss zwischen :min & :max Elemente haben.",
  "validation.between.file": ":Attribute muss zwischen :min & :max Kilobytes groß sein.",
  "validation.between.numeric": ":Attribute muss zwischen :min & :max liegen.",
  "validation.between.string": ":Attribute muss zwischen :min & :max Zeichen lang sein.",
  "validation.boolean": ":Attribute muss entweder 'true' oder 'false' sein.",
  "validation.can": "Das Feld :attribute enthält einen nicht autorisierten Wert.",
  "validation.confirmed": ":Attribute stimmt nicht mit der Bestätigung überein.",
  "validation.contains": "Dem Feld :attribute fehlt ein erforderlicher Wert.",
  "validation.current_password": "Das Passwort ist falsch.",
  "validation.date": ":Attribute muss ein gültiges Datum sein.",
  "validation.date_equals": ":Attribute muss ein Datum gleich :date sein.",
  "validation.date_format": ":Attribute entspricht nicht dem gültigen Format für :format.",
  "validation.decimal": "Die :attribute muss :decimal Dezimalstellen haben.",
  "validation.declined": ":Attribute muss abgelehnt werden.",
  "validation.declined_if": ":Attribute muss abgelehnt werden wenn :other :value ist.",
  "validation.different": ":Attribute und :other müssen sich unterscheiden.",
  "validation.digits": ":Attribute muss :digits Stellen haben.",
  "validation.digits_between": ":Attribute muss zwischen :min und :max Stellen haben.",
  "validation.dimensions": ":Attribute hat ungültige Bildabmessungen.",
  "validation.distinct": ":Attribute beinhaltet einen bereits vorhandenen Wert.",
  "validation.doesnt_contain": ":Attribute darf keines der folgenden enthalten: :values.",
  "validation.doesnt_end_with": ":Attribute darf nicht mit einem der folgenden enden: :values.",
  "validation.doesnt_start_with": ":Attribute darf nicht mit einem der folgenden beginnen: :values.",
  "validation.email": ":Attribute muss eine gültige E-Mail-Adresse sein.",
  "validation.ends_with": ":Attribute muss eine der folgenden Endungen aufweisen: :values",
  "validation.enum": "Der ausgewählte Wert ist ungültig.",
  "validation.exists": "Der gewählte Wert für :attribute ist ungültig.",
  "validation.extensions": "Das Feld :attribute muss eine der folgenden Erweiterungen haben: :values.",
  "validation.file": ":Attribute muss eine Datei sein.",
  "validation.filled": ":Attribute muss ausgefüllt sein.",
  "validation.gt.array": ":Attribute muss mehr als :value Elemente haben.",
  "validation.gt.file": ":Attribute muss größer als :value Kilobytes sein.",
  "validation.gt.numeric": ":Attribute muss größer als :value sein.",
  "validation.gt.string": ":Attribute muss länger als :value Zeichen sein.",
  "validation.gte.array": ":Attribute muss mindestens :value Elemente haben.",
  "validation.gte.file": ":Attribute muss größer oder gleich :value Kilobytes sein.",
  "validation.gte.numeric": ":Attribute muss größer oder gleich :value sein.",
  "validation.gte.string": ":Attribute muss mindestens :value Zeichen lang sein.",
  "validation.hex_color": "Das Feld :attribute muss eine gültige Hexadezimalfarbe sein.",
  "validation.image": ":Attribute muss ein Bild sein.",
  "validation.in": "Der gewählte Wert für :attribute ist ungültig.",
  "validation.in_array": "Der gewählte Wert für :attribute kommt nicht in :other vor.",
  "validation.in_array_keys": "Das Feld :Attribute muss mindestens einen der folgenden Schlüssel enthalten: :Values.",
  "validation.integer": ":Attribute muss eine ganze Zahl sein.",
  "validation.ip": ":Attribute muss eine gültige IP-Adresse sein.",
  "validation.ipv4": ":Attribute muss eine gültige IPv4-Adresse sein.",
  "validation.ipv6": ":Attribute muss eine gültige IPv6-Adresse sein.",
  "validation.json": ":Attribute muss ein gültiger JSON-String sein.",
  "validation.list": ":Attribute muss eine Liste sein.",
  "validation.lowercase": ":Attribute muss in Kleinbuchstaben sein.",
  "validation.lt.array": ":Attribute muss weniger als :value Elemente haben.",
  "validation.lt.file": ":Attribute muss kleiner als :value Kilobytes sein.",
  "validation.lt.numeric": ":Attribute muss kleiner als :value sein.",
  "validation.lt.string": ":Attribute muss kürzer als :value Zeichen sein.",
  "validation.lte.array": ":Attribute darf maximal :value Elemente haben.",
  "validation.lte.file": ":Attribute muss kleiner oder gleich :value Kilobytes sein.",
  "validation.lte.numeric": ":Attribute muss kleiner oder gleich :value sein.",
  "validation.lte.string": ":Attribute darf maximal :value Zeichen lang sein.",
  "validation.mac_address": "Der Wert muss eine gültige MAC-Adresse sein.",
  "validation.max.array": ":Attribute darf maximal :max Elemente haben.",
  "validation.max.file": ":Attribute darf maximal :max Kilobytes groß sein.",
  "validation.max.numeric": ":Attribute darf maximal :max sein.",
  "validation.max.string": ":Attribute darf maximal :max Zeichen haben.",
  "validation.max_digits": ":Attribute darf maximal :max Ziffern lang sein.",
  "validation.mimes": ":Attribute muss den Dateityp :values haben.",
  "validation.mimetypes": ":Attribute muss den Dateityp :values haben.",
  "validation.min.array": ":Attribute muss mindestens :min Elemente haben.",
  "validation.min.file": ":Attribute muss mindestens :min Kilobytes groß sein.",
  "validation.min.numeric": ":Attribute muss mindestens :min sein.",
  "validation.min.string": ":Attribute muss mindestens :min Zeichen lang sein.",
  "validation.min_digits": ":Attribute muss mindestens :min Ziffern lang sein.",
  "validation.missing": "Das Feld :attribute muss fehlen.",
  "validation.missing_if": "Das Feld :attribute muss fehlen, wenn :other gleich :value ist.",
  "validation.missing_unless": "Das Feld :attribute muss fehlen, es sei denn, :other ist :value.",
  "validation.missing_with": "Das Feld :attribute muss fehlen, wenn :values vorhanden ist.",
  "validation.missing_with_all": "Das Feld :attribute muss fehlen, wenn :values vorhanden sind.",
  "validation.multiple_of": ":Attribute muss ein Vielfaches von :value sein.",
  "validation.not_in": "Der gewählte Wert für :attribute ist ungültig.",
  "validation.not_regex": ":Attribute hat ein ungültiges Format.",
  "validation.numeric": ":Attribute muss eine Zahl sein.",
  "validation.password.letters": ":Attribute muss mindestens einen Buchstaben beinhalten.",
  "validation.password.mixed": ":Attribute muss mindestens einen Großbuchstaben und einen Kleinbuchstaben beinhalten.",
  "validation.password.numbers": ":Attribute muss mindestens eine Zahl beinhalten.",
  "validation.password.symbols": ":Attribute muss mindestens ein Sonderzeichen beinhalten.",
  "validation.password.uncompromised": ":Attribute wurde in einem Datenleck gefunden. Bitte wählen Sie ein anderes :attribute.",
  "validation.present": ":Attribute muss vorhanden sein.",
  "validation.present_if": "Das Feld :attribute muss vorhanden sein, wenn :other gleich :value ist.",
  "validation.present_unless": "Das Feld :attribute muss vorhanden sein, es sei denn, :other ist :value.",
  "validation.present_with": "Das Feld :attribute muss vorhanden sein, wenn :values vorhanden ist.",
  "validation.present_with_all": "Das Feld :attribute muss vorhanden sein, wenn :values vorhanden sind.",
  "validation.prohibited": ":Attribute ist unzulässig.",
  "validation.prohibited_if": ":Attribute ist unzulässig, wenn :other :value ist.",
  "validation.prohibited_if_accepted": "Das Feld :attribute ist unzulässig, wenn :other gewählt ist.",
  "validation.prohibited_if_declined": "Das Feld :attribute ist unzulässig, wenn :other abgelehnt ist.",
  "validation.prohibited_unless": ":Attribute ist unzulässig, wenn :other nicht :values ist.",
  "validation.prohibits": ":Attribute verbietet die Angabe von :other.",
  "validation.regex": ":Attribute Format ist ungültig.",
  "validation.required": ":Attribute muss ausgefüllt werden.",
  "validation.required_array_keys": "Dieses Feld muss Einträge enthalten für: :values.",
  "validation.required_if": ":Attribute muss ausgefüllt werden, wenn :other den Wert :value hat.",
  "validation.required_if_accepted": ":Attribute muss ausgefüllt werden, wenn :other gewählt ist.",
  "validation.required_if_declined": "Das Feld :attribute ist erforderlich, wenn :other abgelehnt wird.",
  "validation.required_unless": ":Attribute muss ausgefüllt werden, wenn :other nicht den Wert :values hat.",
  "validation.required_with": ":Attribute muss ausgefüllt werden, wenn :values ausgefüllt wurde.",
  "validation.required_with_all": ":Attribute muss ausgefüllt werden, wenn :values ausgefüllt wurde.",
  "validation.required_without": ":Attribute muss ausgefüllt werden, wenn :values nicht ausgefüllt wurde.",
  "validation.required_without_all": ":Attribute muss ausgefüllt werden, wenn keines der Felder :values ausgefüllt wurde.",
  "validation.same": ":Attribute und :other müssen übereinstimmen.",
  "validation.size.array": ":Attribute muss genau :size Elemente haben.",
  "validation.size.file": ":Attribute muss :size Kilobyte groß sein.",
  "validation.size.numeric": ":Attribute muss gleich :size sein.",
  "validation.size.string": ":Attribute muss :size Zeichen lang sein.",
  "validation.starts_with": ":Attribute muss mit einem der folgenden Anfänge aufweisen: :values",
  "validation.string": ":Attribute muss ein String sein.",
  "validation.timezone": ":Attribute muss eine gültige Zeitzone sein.",
  "validation.ulid": "Die :attribute muss eine gültige ULID sein.",
  "validation.unique": ":Attribute ist bereits vergeben.",
  "validation.uploaded": ":Attribute konnte nicht hochgeladen werden.",
  "validation.uppercase": ":Attribute muss in Großbuchstaben sein.",
  "validation.url": ":Attribute muss eine URL sein.",
  "validation.uuid": ":Attribute muss ein UUID sein.",
  "validation.attributes.address": "Adresse",
  "validation.attributes.affiliate_url": "Affiliate-URL",
  "validation.attributes.age": "Alter",
  "validation.attributes.amount": "Höhe",
  "validation.attributes.announcement": "Bekanntmachung",
  "validation.attributes.area": "Gebiet",
  "validation.attributes.audience_prize": "Publikumspreis",
  "validation.attributes.audience_winner": "Publikumsgewinner",
  "validation.attributes.available": "Verfügbar",
  "validation.attributes.birthday": "Geburtstag",
  "validation.attributes.body": "Körper",
  "validation.attributes.city": "Stadt",
  "validation.attributes.company": "Unternehmen",
  "validation.attributes.compilation": "Zusammenstellung",
  "validation.attributes.concept": "Konzept",
  "validation.attributes.conditions": "Bedingungen",
  "validation.attributes.content": "Inhalt",
  "validation.attributes.contest": "Wettbewerb",
  "validation.attributes.country": "Land",
  "validation.attributes.cover": "Abdeckung",
  "validation.attributes.created_at": "Erstellt am",
  "validation.attributes.creator": "Ersteller",
  "validation.attributes.currency": "Währung",
  "validation.attributes.current_password": "Derzeitiges Passwort",
  "validation.attributes.customer": "Kunde",
  "validation.attributes.date": "Datum",
  "validation.attributes.date_of_birth": "Geburtsdatum",
  "validation.attributes.dates": "Termine",
  "validation.attributes.day": "Tag",
  "validation.attributes.deleted_at": "Gelöscht am",
  "validation.attributes.description": "Beschreibung",
  "validation.attributes.display_type": "Anzeigetyp",
  "validation.attributes.district": "Bezirk",
  "validation.attributes.duration": "Dauer",
  "validation.attributes.email": "E-Mail-Adresse",
  "validation.attributes.excerpt": "Auszug",
  "validation.attributes.filter": "Filter",
  "validation.attributes.finished_at": "fertig um",
  "validation.attributes.first_name": "Vorname",
  "validation.attributes.gender": "Geschlecht",
  "validation.attributes.grand_prize": "Hauptpreis",
  "validation.attributes.group": "Gruppe",
  "validation.attributes.hour": "Stunde",
  "validation.attributes.image": "Bild",
  "validation.attributes.image_desktop": "Desktop-Bild",
  "validation.attributes.image_main": "Hauptbild",
  "validation.attributes.image_mobile": "mobiles Bild",
  "validation.attributes.images": "Bilder",
  "validation.attributes.is_audience_winner": "ist Publikumssieger",
  "validation.attributes.is_hidden": "ist versteckt",
  "validation.attributes.is_subscribed": "ist abonniert",
  "validation.attributes.is_visible": "ist sichtbar",
  "validation.attributes.is_winner": "ist Gewinner",
  "validation.attributes.items": "Artikel",
  "validation.attributes.key": "Schlüssel",
  "validation.attributes.last_name": "Nachname",
  "validation.attributes.lesson": "Lektion",
  "validation.attributes.line_address_1": "Adresszeile 1",
  "validation.attributes.line_address_2": "Adresszeile 2",
  "validation.attributes.login": "Anmeldung",
  "validation.attributes.message": "Nachricht",
  "validation.attributes.middle_name": "Zweitname",
  "validation.attributes.minute": "Minute",
  "validation.attributes.mobile": "Handynummer",
  "validation.attributes.month": "Monat",
  "validation.attributes.name": "Name",
  "validation.attributes.national_code": "Länderkennung",
  "validation.attributes.number": "Nummer",
  "validation.attributes.password": "Passwort",
  "validation.attributes.password_confirmation": "Passwortbestätigung",
  "validation.attributes.phone": "Telefonnummer",
  "validation.attributes.photo": "Foto",
  "validation.attributes.portfolio": "Portfolio",
  "validation.attributes.postal_code": "Postleitzahl",
  "validation.attributes.preview": "Vorschau",
  "validation.attributes.price": "Preis",
  "validation.attributes.product_id": "Produkt ID",
  "validation.attributes.product_uid": "Produkt-UID",
  "validation.attributes.product_uuid": "Produkt-UUID",
  "validation.attributes.promo_code": "Aktionscode",
  "validation.attributes.province": "Provinz",
  "validation.attributes.quantity": "Menge",
  "validation.attributes.reason": "Grund",
  "validation.attributes.recaptcha_response_field": "Captcha-Feld",
  "validation.attributes.referee": "Schiedsrichter",
  "validation.attributes.referees": "Schiedsrichter",
  "validation.attributes.reject_reason": "Ablehnungsgrund",
  "validation.attributes.remember": "Erinnern",
  "validation.attributes.restored_at": "Wiederhergestellt am",
  "validation.attributes.result_text_under_image": "Ergebnistext unter Bild",
  "validation.attributes.role": "Rolle",
  "validation.attributes.rule": "Regel",
  "validation.attributes.rules": "Regeln",
  "validation.attributes.second": "Sekunde",
  "validation.attributes.sex": "Geschlecht",
  "validation.attributes.shipment": "Sendung",
  "validation.attributes.short_text": "Kurzer Text",
  "validation.attributes.size": "Größe",
  "validation.attributes.skills": "Fähigkeiten",
  "validation.attributes.slug": "Schnecke",
  "validation.attributes.specialization": "Spezialisierung",
  "validation.attributes.started_at": "fing an bei",
  "validation.attributes.state": "Bundesland",
  "validation.attributes.status": "Status",
  "validation.attributes.street": "Straße",
  "validation.attributes.student": "Schüler/Student",
  "validation.attributes.subject": "Gegenstand",
  "validation.attributes.tag": "Etikett",
  "validation.attributes.tags": "Stichworte",
  "validation.attributes.teacher": "Lehrer",
  "validation.attributes.terms": "Bedingungen",
  "validation.attributes.test_description": "Test Beschreibung",
  "validation.attributes.test_locale": "Test Region",
  "validation.attributes.test_name": "Testname",
  "validation.attributes.text": "Text",
  "validation.attributes.time": "Uhrzeit",
  "validation.attributes.title": "Titel",
  "validation.attributes.type": "Typ",
  "validation.attributes.updated_at": "Aktualisiert am",
  "validation.attributes.user": "Benutzer",
  "validation.attributes.username": "Benutzername",
  "validation.attributes.value": "Wert",
  "validation.attributes.winner": "Gewinner",
  "validation.attributes.work": "Arbeit",
  "validation.attributes.year": "Jahr"
};
const __vite_glob_1_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_de
}, Symbol.toStringTag, { value: "Module" }));
const php_en = {
  "auth.failed": "These credentials do not match our records.",
  "auth.password": "The provided password is incorrect.",
  "auth.throttle": "Too many login attempts. Please try again in :seconds seconds.",
  "pagination.previous": "&laquo; Previous",
  "pagination.next": "Next &raquo;",
  "passwords.reset": "Your password has been reset.",
  "passwords.sent": "We have emailed your password reset link.",
  "passwords.throttled": "Please wait before retrying.",
  "passwords.token": "This password reset token is invalid.",
  "passwords.user": "We can't find a user with that email address.",
  "validation.accepted": "The :attribute field must be accepted.",
  "validation.accepted_if": "The :attribute field must be accepted when :other is :value.",
  "validation.active_url": "The :attribute field must be a valid URL.",
  "validation.after": "The :attribute field must be a date after :date.",
  "validation.after_or_equal": "The :attribute field must be a date after or equal to :date.",
  "validation.alpha": "The :attribute field must only contain letters.",
  "validation.alpha_dash": "The :attribute field must only contain letters, numbers, dashes, and underscores.",
  "validation.alpha_num": "The :attribute field must only contain letters and numbers.",
  "validation.any_of": "The :attribute field is invalid.",
  "validation.array": "The :attribute field must be an array.",
  "validation.ascii": "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
  "validation.before": "The :attribute field must be a date before :date.",
  "validation.before_or_equal": "The :attribute field must be a date before or equal to :date.",
  "validation.between.array": "The :attribute field must have between :min and :max items.",
  "validation.between.file": "The :attribute field must be between :min and :max kilobytes.",
  "validation.between.numeric": "The :attribute field must be between :min and :max.",
  "validation.between.string": "The :attribute field must be between :min and :max characters.",
  "validation.boolean": "The :attribute field must be true or false.",
  "validation.can": "The :attribute field contains an unauthorized value.",
  "validation.confirmed": "The :attribute field confirmation does not match.",
  "validation.contains": "The :attribute field is missing a required value.",
  "validation.current_password": "The password is incorrect.",
  "validation.date": "The :attribute field must be a valid date.",
  "validation.date_equals": "The :attribute field must be a date equal to :date.",
  "validation.date_format": "The :attribute field must match the format :format.",
  "validation.decimal": "The :attribute field must have :decimal decimal places.",
  "validation.declined": "The :attribute field must be declined.",
  "validation.declined_if": "The :attribute field must be declined when :other is :value.",
  "validation.different": "The :attribute field and :other must be different.",
  "validation.digits": "The :attribute field must be :digits digits.",
  "validation.digits_between": "The :attribute field must be between :min and :max digits.",
  "validation.dimensions": "The :attribute field has invalid image dimensions.",
  "validation.distinct": "The :attribute field has a duplicate value.",
  "validation.doesnt_contain": "The :attribute field must not contain any of the following: :values.",
  "validation.doesnt_end_with": "The :attribute field must not end with one of the following: :values.",
  "validation.doesnt_start_with": "The :attribute field must not start with one of the following: :values.",
  "validation.email": "The :attribute field must be a valid email address.",
  "validation.encoding": "The :attribute field must be encoded in :encoding.",
  "validation.ends_with": "The :attribute field must end with one of the following: :values.",
  "validation.enum": "The selected :attribute is invalid.",
  "validation.exists": "The selected :attribute is invalid.",
  "validation.extensions": "The :attribute field must have one of the following extensions: :values.",
  "validation.file": "The :attribute field must be a file.",
  "validation.filled": "The :attribute field must have a value.",
  "validation.gt.array": "The :attribute field must have more than :value items.",
  "validation.gt.file": "The :attribute field must be greater than :value kilobytes.",
  "validation.gt.numeric": "The :attribute field must be greater than :value.",
  "validation.gt.string": "The :attribute field must be greater than :value characters.",
  "validation.gte.array": "The :attribute field must have :value items or more.",
  "validation.gte.file": "The :attribute field must be greater than or equal to :value kilobytes.",
  "validation.gte.numeric": "The :attribute field must be greater than or equal to :value.",
  "validation.gte.string": "The :attribute field must be greater than or equal to :value characters.",
  "validation.hex_color": "The :attribute field must be a valid hexadecimal color.",
  "validation.image": "The :attribute field must be an image.",
  "validation.in": "The selected :attribute is invalid.",
  "validation.in_array": "The :attribute field must exist in :other.",
  "validation.in_array_keys": "The :attribute field must contain at least one of the following keys: :values.",
  "validation.integer": "The :attribute field must be an integer.",
  "validation.ip": "The :attribute field must be a valid IP address.",
  "validation.ipv4": "The :attribute field must be a valid IPv4 address.",
  "validation.ipv6": "The :attribute field must be a valid IPv6 address.",
  "validation.json": "The :attribute field must be a valid JSON string.",
  "validation.list": "The :attribute field must be a list.",
  "validation.lowercase": "The :attribute field must be lowercase.",
  "validation.lt.array": "The :attribute field must have less than :value items.",
  "validation.lt.file": "The :attribute field must be less than :value kilobytes.",
  "validation.lt.numeric": "The :attribute field must be less than :value.",
  "validation.lt.string": "The :attribute field must be less than :value characters.",
  "validation.lte.array": "The :attribute field must not have more than :value items.",
  "validation.lte.file": "The :attribute field must be less than or equal to :value kilobytes.",
  "validation.lte.numeric": "The :attribute field must be less than or equal to :value.",
  "validation.lte.string": "The :attribute field must be less than or equal to :value characters.",
  "validation.mac_address": "The :attribute field must be a valid MAC address.",
  "validation.max.array": "The :attribute field must not have more than :max items.",
  "validation.max.file": "The :attribute field must not be greater than :max kilobytes.",
  "validation.max.numeric": "The :attribute field must not be greater than :max.",
  "validation.max.string": "The :attribute field must not be greater than :max characters.",
  "validation.max_digits": "The :attribute field must not have more than :max digits.",
  "validation.mimes": "The :attribute field must be a file of type: :values.",
  "validation.mimetypes": "The :attribute field must be a file of type: :values.",
  "validation.min.array": "The :attribute field must have at least :min items.",
  "validation.min.file": "The :attribute field must be at least :min kilobytes.",
  "validation.min.numeric": "The :attribute field must be at least :min.",
  "validation.min.string": "The :attribute field must be at least :min characters.",
  "validation.min_digits": "The :attribute field must have at least :min digits.",
  "validation.missing": "The :attribute field must be missing.",
  "validation.missing_if": "The :attribute field must be missing when :other is :value.",
  "validation.missing_unless": "The :attribute field must be missing unless :other is :value.",
  "validation.missing_with": "The :attribute field must be missing when :values is present.",
  "validation.missing_with_all": "The :attribute field must be missing when :values are present.",
  "validation.multiple_of": "The :attribute field must be a multiple of :value.",
  "validation.not_in": "The selected :attribute is invalid.",
  "validation.not_regex": "The :attribute field format is invalid.",
  "validation.numeric": "The :attribute field must be a number.",
  "validation.password.letters": "The :attribute field must contain at least one letter.",
  "validation.password.mixed": "The :attribute field must contain at least one uppercase and one lowercase letter.",
  "validation.password.numbers": "The :attribute field must contain at least one number.",
  "validation.password.symbols": "The :attribute field must contain at least one symbol.",
  "validation.password.uncompromised": "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
  "validation.present": "The :attribute field must be present.",
  "validation.present_if": "The :attribute field must be present when :other is :value.",
  "validation.present_unless": "The :attribute field must be present unless :other is :value.",
  "validation.present_with": "The :attribute field must be present when :values is present.",
  "validation.present_with_all": "The :attribute field must be present when :values are present.",
  "validation.prohibited": "The :attribute field is prohibited.",
  "validation.prohibited_if": "The :attribute field is prohibited when :other is :value.",
  "validation.prohibited_if_accepted": "The :attribute field is prohibited when :other is accepted.",
  "validation.prohibited_if_declined": "The :attribute field is prohibited when :other is declined.",
  "validation.prohibited_unless": "The :attribute field is prohibited unless :other is in :values.",
  "validation.prohibits": "The :attribute field prohibits :other from being present.",
  "validation.regex": "The :attribute field format is invalid.",
  "validation.required": "The :attribute field is required.",
  "validation.required_array_keys": "The :attribute field must contain entries for: :values.",
  "validation.required_if": "The :attribute field is required when :other is :value.",
  "validation.required_if_accepted": "The :attribute field is required when :other is accepted.",
  "validation.required_if_declined": "The :attribute field is required when :other is declined.",
  "validation.required_unless": "The :attribute field is required unless :other is in :values.",
  "validation.required_with": "The :attribute field is required when :values is present.",
  "validation.required_with_all": "The :attribute field is required when :values are present.",
  "validation.required_without": "The :attribute field is required when :values is not present.",
  "validation.required_without_all": "The :attribute field is required when none of :values are present.",
  "validation.same": "The :attribute field must match :other.",
  "validation.size.array": "The :attribute field must contain :size items.",
  "validation.size.file": "The :attribute field must be :size kilobytes.",
  "validation.size.numeric": "The :attribute field must be :size.",
  "validation.size.string": "The :attribute field must be :size characters.",
  "validation.starts_with": "The :attribute field must start with one of the following: :values.",
  "validation.string": "The :attribute field must be a string.",
  "validation.timezone": "The :attribute field must be a valid timezone.",
  "validation.unique": "The :attribute has already been taken.",
  "validation.uploaded": "The :attribute failed to upload.",
  "validation.uppercase": "The :attribute field must be uppercase.",
  "validation.url": "The :attribute field must be a valid URL.",
  "validation.ulid": "The :attribute field must be a valid ULID.",
  "validation.uuid": "The :attribute field must be a valid UUID.",
  "validation.custom.attribute-name.rule-name": "custom-message"
};
const __vite_glob_1_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_en
}, Symbol.toStringTag, { value: "Module" }));
const php_es = {
  "actions.accept": "Aceptar",
  "actions.action": "Acción",
  "actions.actions": "Acciones",
  "actions.add": "Agregar",
  "actions.admin": "Administrar",
  "actions.agree": "Aceptar",
  "actions.archive": "Archivar",
  "actions.assign": "Asignar",
  "actions.associate": "Asociar",
  "actions.attach": "Adjuntar",
  "actions.browse": "Navegar",
  "actions.cancel": "Cancelar",
  "actions.choose": "Elegir",
  "actions.choose_file": "Elegir archivo",
  "actions.choose_image": "Elegir Imagen",
  "actions.click_to_copy": "Haga clic para copiar",
  "actions.close": "Cerrar",
  "actions.collapse": "Colapsar",
  "actions.collapse_all": "Colapsar todo",
  "actions.comment": "Comentar",
  "actions.confirm": "Confirmar",
  "actions.connect": "Conectar",
  "actions.create": "Crear",
  "actions.delete": "Borrar",
  "actions.detach": "Desasociar",
  "actions.details": "Detalles",
  "actions.disable": "Desactivar",
  "actions.discard": "Descartar",
  "actions.done": "Hecho",
  "actions.down": "Abajo",
  "actions.duplicate": "Duplicar",
  "actions.edit": "Editar",
  "actions.enable": "Permitir",
  "actions.expand": "Expandir",
  "actions.expand_all": "Expandir todo",
  "actions.explanation": "Explicación",
  "actions.export": "Exportar",
  "actions.file": "Archivo",
  "actions.files": "Archivos",
  "actions.go_home": "Ir a Inicio",
  "actions.hide": "Ocultar",
  "actions.home": "Inicio",
  "actions.image": "Imagen",
  "actions.impersonate": "Personificar",
  "actions.impersonation": "Personificación",
  "actions.import": "Importar",
  "actions.introduction": "Introducción",
  "actions.like": "Me gusta",
  "actions.load": "Cargar",
  "actions.localize": "Localizar",
  "actions.log_in": "Acceder",
  "actions.log_out": "Cerrar sesión",
  "actions.named.add": "Agregar :name",
  "actions.named.choose": "Elegir :name",
  "actions.named.create": "Crear :name",
  "actions.named.delete": "Eliminar :name",
  "actions.named.duplicate": "Duplicar :name",
  "actions.named.edit": "Editar :name",
  "actions.named.export": "Exportar :name",
  "actions.named.hide": "Ocultar :name",
  "actions.named.import": "Importar :name",
  "actions.named.new": "Nuevo :name",
  "actions.named.restore": "Restaurar :name",
  "actions.named.save": "Guardar :name",
  "actions.named.search": "Buscar :name",
  "actions.named.show": "Mostrar :name",
  "actions.named.update": "Actualizar :name",
  "actions.named.view": "Ver :name",
  "actions.new": "Nuevo",
  "actions.no": "No",
  "actions.open": "Abrir",
  "actions.open_website": "Abrir en el sitio web",
  "actions.preview": "Previsualizar",
  "actions.price": "Precio",
  "actions.record": "Registro",
  "actions.restore": "Restaurar",
  "actions.save": "Guardar",
  "actions.save_and_close": "Guardar y cerrar",
  "actions.save_and_return": "Guardar y volver",
  "actions.search": "Buscar",
  "actions.select": "Seleccionar",
  "actions.select_all": "Seleccionar todo",
  "actions.send": "Enviar",
  "actions.settings": "Ajustes",
  "actions.show": "Mostrar",
  "actions.show_all": "Mostrar todo",
  "actions.sign_in": "Iniciar sesión",
  "actions.solve": "Resolver",
  "actions.start": "Comenzar",
  "actions.stop": "Detener",
  "actions.submit": "Enviar",
  "actions.subscribe": "Suscribir",
  "actions.switch": "Cambiar",
  "actions.switch_to_role": "Cambiar de rol",
  "actions.tag": "Etiqueta",
  "actions.tags": "Etiquetas",
  "actions.target_link.blank": "Abrir en una ventana nueva",
  "actions.target_link.parent": "Abrir en el marco principal",
  "actions.target_link.self": "Abrir en la ventana actual",
  "actions.target_link.top": "Abrir en el marco superior",
  "actions.translate": "Traducir",
  "actions.translate_it": "Traducirlo",
  "actions.unpack": "Desglosar",
  "actions.unsubscribe": "Darse de baja",
  "actions.up": "Arriba",
  "actions.update": "Actualizar",
  "actions.user": "Usuario",
  "actions.view": "Ver",
  "actions.yes": "Sí",
  "auth.failed": "Estas credenciales no coinciden con nuestros registros.",
  "auth.password": "La contraseña es incorrecta.",
  "auth.throttle": "Demasiados intentos de acceso. Por favor intente nuevamente en :seconds segundos.",
  "http-statuses.0": "Error desconocido",
  "http-statuses.100": "Continuar",
  "http-statuses.101": "Protocolos de conmutación",
  "http-statuses.102": "Procesando",
  "http-statuses.200": "DE ACUERDO",
  "http-statuses.201": "Creado",
  "http-statuses.202": "Aceptado",
  "http-statuses.203": "Información no autorizada",
  "http-statuses.204": "Sin contenido",
  "http-statuses.205": "Restablecer contenido",
  "http-statuses.206": "Contenido parcial",
  "http-statuses.207": "Multiestado",
  "http-statuses.208": "Ya Reportado",
  "http-statuses.226": "IM usado",
  "http-statuses.300": "Múltiples opciones",
  "http-statuses.301": "Movido permanentemente",
  "http-statuses.302": "Encontrado",
  "http-statuses.303": "Ver otros",
  "http-statuses.304": "No modificado",
  "http-statuses.305": "Usa proxy",
  "http-statuses.307": "Redirección temporal",
  "http-statuses.308": "Redirección permanente",
  "http-statuses.400": "Solicitud incorrecta",
  "http-statuses.401": "No autorizado",
  "http-statuses.402": "Pago requerido",
  "http-statuses.403": "Prohibido",
  "http-statuses.404": "No encontrado",
  "http-statuses.405": "Método no permitido",
  "http-statuses.406": "Inaceptable",
  "http-statuses.407": "Se requiere autenticación proxy",
  "http-statuses.408": "Solicitud de tiempo de espera",
  "http-statuses.409": "Conflicto",
  "http-statuses.410": "Recurso no disponible",
  "http-statuses.411": "Longitud requerida",
  "http-statuses.412": "Error de condición previa",
  "http-statuses.413": "Solicitud demasiado grande",
  "http-statuses.414": "URI demasiado largo",
  "http-statuses.415": "Tipo de medio no admitido",
  "http-statuses.416": "Rango no satisfactorio",
  "http-statuses.417": "Expectativa fallida",
  "http-statuses.418": "Soy una tetera",
  "http-statuses.419": "La sesión ha expirado",
  "http-statuses.421": "Solicitud mal dirigida",
  "http-statuses.422": "Entidad no procesable",
  "http-statuses.423": "Bloqueado",
  "http-statuses.424": "Dependencia fallida",
  "http-statuses.425": "Demasiado temprano",
  "http-statuses.426": "Se requiere actualización",
  "http-statuses.428": "Precondición requerida",
  "http-statuses.429": "Demasiadas solicitudes",
  "http-statuses.431": "Campos de encabezado de solicitud demasiado grandes",
  "http-statuses.444": "Conexión cerrada sin respuesta",
  "http-statuses.449": "Reintentar con",
  "http-statuses.451": "No disponible por razones legales",
  "http-statuses.499": "Solicitud cerrada del cliente",
  "http-statuses.500": "Error interno del servidor",
  "http-statuses.501": "No se ha implementado",
  "http-statuses.502": "Mala puerta de enlace",
  "http-statuses.503": "Modo de mantenimiento",
  "http-statuses.504": "Tiempo de espera de puerta de enlace",
  "http-statuses.505": "Versión HTTP no compatible",
  "http-statuses.506": "Variante También Negocia",
  "http-statuses.507": "Espacio insuficiente",
  "http-statuses.508": "Bucle detectado",
  "http-statuses.509": "Límite de ancho de banda excedido",
  "http-statuses.510": "no extendido",
  "http-statuses.511": "Se requiere autenticación de red",
  "http-statuses.520": "Error desconocido",
  "http-statuses.521": "El servidor web está caído",
  "http-statuses.522": "Tiempo de conexión agotado",
  "http-statuses.523": "El origen es inalcanzable",
  "http-statuses.524": "Se produjo un tiempo de espera",
  "http-statuses.525": "Protocolo de enlace SSL fallido",
  "http-statuses.526": "Certificado SSL no válido",
  "http-statuses.527": "Error de cañón de riel",
  "http-statuses.598": "Error de tiempo de espera de lectura de red",
  "http-statuses.599": "Error de tiempo de espera de conexión de red",
  "http-statuses.unknownError": "Error desconocido",
  "pagination.next": "Siguiente &raquo;",
  "pagination.previous": "&laquo; Anterior",
  "passwords.reset": "Su contraseña ha sido restablecida.",
  "passwords.sent": "Le hemos enviado por correo electrónico el enlace para restablecer su contraseña.",
  "passwords.throttled": "Por favor espere antes de intentar de nuevo.",
  "passwords.token": "El token de restablecimiento de contraseña es inválido.",
  "passwords.user": "No encontramos ningún usuario con ese correo electrónico.",
  "validation.accepted": "El campo :attribute debe ser aceptado.",
  "validation.accepted_if": "El campo :attribute debe ser aceptado cuando :other sea :value.",
  "validation.active_url": "El campo :attribute debe ser una URL válida.",
  "validation.after": "El campo :attribute debe ser una fecha posterior a :date.",
  "validation.after_or_equal": "El campo :attribute debe ser una fecha posterior o igual a :date.",
  "validation.alpha": "El campo :attribute sólo debe contener letras.",
  "validation.alpha_dash": "El campo :attribute sólo debe contener letras, números, guiones y guiones bajos.",
  "validation.alpha_num": "El campo :attribute sólo debe contener letras y números.",
  "validation.any_of": "El campo :attribute no es válido.",
  "validation.array": "El campo :attribute debe ser un conjunto.",
  "validation.ascii": "El campo :attribute solo debe contener caracteres alfanuméricos y símbolos de un solo byte.",
  "validation.before": "El campo :attribute debe ser una fecha anterior a :date.",
  "validation.before_or_equal": "El campo :attribute debe ser una fecha anterior o igual a :date.",
  "validation.between.array": "El campo :attribute tiene que tener entre :min - :max elementos.",
  "validation.between.file": "El campo :attribute debe pesar entre :min - :max kilobytes.",
  "validation.between.numeric": "El campo :attribute tiene que estar entre :min - :max.",
  "validation.between.string": "El campo :attribute tiene que tener entre :min - :max caracteres.",
  "validation.boolean": "El campo :attribute debe tener un valor verdadero o falso.",
  "validation.can": "El campo :attribute contiene un valor no autorizado.",
  "validation.confirmed": "La confirmación de :attribute no coincide.",
  "validation.contains": "Al campo :attribute le falta un valor obligatorio.",
  "validation.current_password": "La contraseña es incorrecta.",
  "validation.date": "El campo :attribute debe ser una fecha válida.",
  "validation.date_equals": "El campo :attribute debe ser una fecha igual a :date.",
  "validation.date_format": "El campo :attribute debe coincidir con el formato :format.",
  "validation.decimal": "El campo :attribute debe tener :decimal cifras decimales.",
  "validation.declined": "El campo :attribute debe ser rechazado.",
  "validation.declined_if": "El campo :attribute debe ser rechazado cuando :other sea :value.",
  "validation.different": "El campo :attribute y :other deben ser diferentes.",
  "validation.digits": "El campo :attribute debe tener :digits dígitos.",
  "validation.digits_between": "El campo :attribute debe tener entre :min y :max dígitos.",
  "validation.dimensions": "El campo :attribute tiene dimensiones de imagen no válidas.",
  "validation.distinct": "El campo :attribute contiene un valor duplicado.",
  "validation.doesnt_contain": "El campo :attribute no debe contener ninguno de los siguientes valores: :values.",
  "validation.doesnt_end_with": "El campo :attribute no debe finalizar con uno de los siguientes: :values.",
  "validation.doesnt_start_with": "El campo :attribute no debe comenzar con uno de los siguientes: :values.",
  "validation.email": "El campo :attribute no es un correo válido.",
  "validation.ends_with": "El campo :attribute debe finalizar con uno de los siguientes valores: :values",
  "validation.enum": "El campo :attribute no está en la lista de valores permitidos.",
  "validation.exists": "El campo :attribute no existe.",
  "validation.extensions": "El campo :attribute debe tener una de las siguientes extensiones: :values.",
  "validation.file": "El campo :attribute debe ser un archivo.",
  "validation.filled": "El campo :attribute es obligatorio.",
  "validation.gt.array": "El campo :attribute debe tener más de :value elementos.",
  "validation.gt.file": "El campo :attribute debe tener más de :value kilobytes.",
  "validation.gt.numeric": "El campo :attribute debe ser mayor que :value.",
  "validation.gt.string": "El campo :attribute debe tener más de :value caracteres.",
  "validation.gte.array": "El campo :attribute debe tener como mínimo :value elementos.",
  "validation.gte.file": "El campo :attribute debe tener como mínimo :value kilobytes.",
  "validation.gte.numeric": "El campo :attribute debe ser como mínimo :value.",
  "validation.gte.string": "El campo :attribute debe tener como mínimo :value caracteres.",
  "validation.hex_color": "El campo :attribute debe tener un color hexadecimal válido.",
  "validation.image": "El campo :attribute debe ser una imagen.",
  "validation.in": "El campo :attribute no está en la lista de valores permitidos.",
  "validation.in_array": "El campo :attribute debe existir en :other.",
  "validation.in_array_keys": "El campo :attribute debe contener al menos una de las siguientes claves: :values.",
  "validation.integer": "El campo :attribute debe ser un número entero.",
  "validation.ip": "El campo :attribute debe ser una dirección IP válida.",
  "validation.ipv4": "El campo :attribute debe ser una dirección IPv4 válida.",
  "validation.ipv6": "El campo :attribute debe ser una dirección IPv6 válida.",
  "validation.json": "El campo :attribute debe ser una cadena JSON válida.",
  "validation.list": "El campo :attribute debe ser una lista.",
  "validation.lowercase": "El campo :attribute debe estar en minúscula.",
  "validation.lt.array": "El campo :attribute debe tener menos de :value elementos.",
  "validation.lt.file": "El campo :attribute debe tener menos de :value kilobytes.",
  "validation.lt.numeric": "El campo :attribute debe ser menor que :value.",
  "validation.lt.string": "El campo :attribute debe tener menos de :value caracteres.",
  "validation.lte.array": "El campo :attribute debe tener como máximo :value elementos.",
  "validation.lte.file": "El campo :attribute debe tener como máximo :value kilobytes.",
  "validation.lte.numeric": "El campo :attribute debe ser como máximo :value.",
  "validation.lte.string": "El campo :attribute debe tener como máximo :value caracteres.",
  "validation.mac_address": "El campo :attribute debe ser una dirección MAC válida.",
  "validation.max.array": "El campo :attribute no debe tener más de :max elementos.",
  "validation.max.file": "El campo :attribute no debe ser mayor que :max kilobytes.",
  "validation.max.numeric": "El campo :attribute no debe ser mayor que :max.",
  "validation.max.string": "El campo :attribute no debe ser mayor que :max caracteres.",
  "validation.max_digits": "El campo :attribute no debe tener más de :max dígitos.",
  "validation.mimes": "El campo :attribute debe ser un archivo con formato: :values.",
  "validation.mimetypes": "El campo :attribute debe ser un archivo con formato: :values.",
  "validation.min.array": "El campo :attribute debe tener al menos :min elementos.",
  "validation.min.file": "El tamaño de :attribute debe ser de al menos :min kilobytes.",
  "validation.min.numeric": "El tamaño de :attribute debe ser de al menos :min.",
  "validation.min.string": "El campo :attribute debe contener al menos :min caracteres.",
  "validation.min_digits": "El campo :attribute debe tener al menos :min dígitos.",
  "validation.missing": "El campo :attribute no debe estar presente.",
  "validation.missing_if": "El campo :attribute no debe estar presente cuando :other sea :value.",
  "validation.missing_unless": "El campo :attribute no debe estar presente a menos que :other sea :value.",
  "validation.missing_with": "El campo :attribute no debe estar presente si alguno de los campos :values está presente.",
  "validation.missing_with_all": "El campo :attribute no debe estar presente cuando los campos :values estén presentes.",
  "validation.multiple_of": "El campo :attribute debe ser múltiplo de :value",
  "validation.not_in": "El campo :attribute no debe estar en la lista.",
  "validation.not_regex": "El formato del campo :attribute no es válido.",
  "validation.numeric": "El campo :attribute debe ser numérico.",
  "validation.password.letters": "La :attribute debe contener al menos una letra.",
  "validation.password.mixed": "La :attribute debe contener al menos una letra mayúscula y una minúscula.",
  "validation.password.numbers": "La :attribute debe contener al menos un número.",
  "validation.password.symbols": "La :attribute debe contener al menos un símbolo.",
  "validation.password.uncompromised": "La :attribute proporcionada se ha visto comprometida en una filtración de datos (data leak). Elija una :attribute diferente.",
  "validation.present": "El campo :attribute debe estar presente.",
  "validation.present_if": "El campo :attribute debe estar presente cuando :other es :value.",
  "validation.present_unless": "El campo :attribute debe estar presente a menos que :other sea :value.",
  "validation.present_with": "El campo :attribute debe estar presente cuando :values esté presente.",
  "validation.present_with_all": "El campo :attribute debe estar presente cuando :values estén presentes.",
  "validation.prohibited": "El campo :attribute está prohibido.",
  "validation.prohibited_if": "El campo :attribute está prohibido cuando :other es :value.",
  "validation.prohibited_if_accepted": "El campo :attribute está prohibido cuando se acepta :other.",
  "validation.prohibited_if_declined": "El campo :attribute está prohibido cuando se rechaza :other.",
  "validation.prohibited_unless": "El campo :attribute está prohibido a menos que :other sea :values.",
  "validation.prohibits": "El campo :attribute prohibe que :other esté presente.",
  "validation.regex": "El formato del campo :attribute no es válido.",
  "validation.required": "El campo :attribute es obligatorio.",
  "validation.required_array_keys": "El campo :attribute debe contener entradas para: :values.",
  "validation.required_if": "El campo :attribute es obligatorio cuando :other es :value.",
  "validation.required_if_accepted": "El campo :attribute es obligatorio si :other es aceptado.",
  "validation.required_if_declined": "El campo :attribute es obligatorio si :other es rechazado.",
  "validation.required_unless": "El campo :attribute es obligatorio a menos que :other esté en :values.",
  "validation.required_with": "El campo :attribute es obligatorio cuando :values está presente.",
  "validation.required_with_all": "El campo :attribute es obligatorio cuando :values están presentes.",
  "validation.required_without": "El campo :attribute es obligatorio cuando :values no está presente.",
  "validation.required_without_all": "El campo :attribute es obligatorio cuando ninguno de :values está presente.",
  "validation.same": "Los campos :attribute y :other deben coincidir.",
  "validation.size.array": "El campo :attribute debe contener :size elementos.",
  "validation.size.file": "El tamaño de :attribute debe ser :size kilobytes.",
  "validation.size.numeric": "El tamaño de :attribute debe ser :size.",
  "validation.size.string": "El campo :attribute debe contener :size caracteres.",
  "validation.starts_with": "El campo :attribute debe comenzar con uno de los siguientes valores: :values",
  "validation.string": "El campo :attribute debe ser una cadena de caracteres.",
  "validation.timezone": "El campo :attribute debe ser una zona horaria válida.",
  "validation.ulid": "El campo :attribute debe ser un ULID válido.",
  "validation.unique": "El campo :attribute ya ha sido registrado.",
  "validation.uploaded": "Subir :attribute ha fallado.",
  "validation.uppercase": "El campo :attribute debe estar en mayúscula.",
  "validation.url": "El campo :attribute debe ser una URL válida.",
  "validation.uuid": "El campo :attribute debe ser un UUID válido.",
  "validation.attributes.address": "dirección",
  "validation.attributes.affiliate_url": "URL de afiliado",
  "validation.attributes.age": "edad",
  "validation.attributes.amount": "cantidad",
  "validation.attributes.announcement": "anuncio",
  "validation.attributes.area": "área",
  "validation.attributes.audience_prize": "premio del público",
  "validation.attributes.audience_winner": "ganador del público",
  "validation.attributes.available": "disponible",
  "validation.attributes.birthday": "cumpleaños",
  "validation.attributes.body": "contenido",
  "validation.attributes.city": "ciudad",
  "validation.attributes.company": "compañía",
  "validation.attributes.compilation": "compilación",
  "validation.attributes.concept": "concepto",
  "validation.attributes.conditions": "condiciones",
  "validation.attributes.content": "contenido",
  "validation.attributes.contest": "concurso",
  "validation.attributes.country": "país",
  "validation.attributes.cover": "portada",
  "validation.attributes.created_at": "creado el",
  "validation.attributes.creator": "creador",
  "validation.attributes.currency": "moneda",
  "validation.attributes.current_password": "contraseña actual",
  "validation.attributes.customer": "cliente",
  "validation.attributes.date": "fecha",
  "validation.attributes.date_of_birth": "fecha de nacimiento",
  "validation.attributes.dates": "fechas",
  "validation.attributes.day": "día",
  "validation.attributes.deleted_at": "eliminado el",
  "validation.attributes.description": "descripción",
  "validation.attributes.display_type": "tipo de visualización",
  "validation.attributes.district": "distrito",
  "validation.attributes.duration": "duración",
  "validation.attributes.email": "correo electrónico",
  "validation.attributes.excerpt": "extracto",
  "validation.attributes.filter": "filtro",
  "validation.attributes.finished_at": "terminado el",
  "validation.attributes.first_name": "nombre",
  "validation.attributes.gender": "género",
  "validation.attributes.grand_prize": "gran Premio",
  "validation.attributes.group": "grupo",
  "validation.attributes.hour": "hora",
  "validation.attributes.image": "imagen",
  "validation.attributes.image_desktop": "imagen de escritorio",
  "validation.attributes.image_main": "imagen principal",
  "validation.attributes.image_mobile": "imagen móvil",
  "validation.attributes.images": "imágenes",
  "validation.attributes.is_audience_winner": "es ganador de audiencia",
  "validation.attributes.is_hidden": "está oculto",
  "validation.attributes.is_subscribed": "está suscrito",
  "validation.attributes.is_visible": "es visible",
  "validation.attributes.is_winner": "es ganador",
  "validation.attributes.items": "elementos",
  "validation.attributes.key": "clave",
  "validation.attributes.last_name": "apellidos",
  "validation.attributes.lesson": "lección",
  "validation.attributes.line_address_1": "línea de dirección 1",
  "validation.attributes.line_address_2": "línea de dirección 2",
  "validation.attributes.login": "acceso",
  "validation.attributes.message": "mensaje",
  "validation.attributes.middle_name": "segundo nombre",
  "validation.attributes.minute": "minuto",
  "validation.attributes.mobile": "móvil",
  "validation.attributes.month": "mes",
  "validation.attributes.name": "nombre",
  "validation.attributes.national_code": "código nacional",
  "validation.attributes.number": "número",
  "validation.attributes.password": "contraseña",
  "validation.attributes.password_confirmation": "confirmación de la contraseña",
  "validation.attributes.phone": "teléfono",
  "validation.attributes.photo": "foto",
  "validation.attributes.portfolio": "portafolio",
  "validation.attributes.postal_code": "código postal",
  "validation.attributes.preview": "vista preliminar",
  "validation.attributes.price": "precio",
  "validation.attributes.product_id": "ID del producto",
  "validation.attributes.product_uid": "UID del producto",
  "validation.attributes.product_uuid": "UUID del producto",
  "validation.attributes.promo_code": "código promocional",
  "validation.attributes.province": "provincia",
  "validation.attributes.quantity": "cantidad",
  "validation.attributes.reason": "razón",
  "validation.attributes.recaptcha_response_field": "respuesta del recaptcha",
  "validation.attributes.referee": "árbitro",
  "validation.attributes.referees": "árbitros",
  "validation.attributes.reject_reason": "motivo de rechazo",
  "validation.attributes.remember": "recordar",
  "validation.attributes.restored_at": "restaurado el",
  "validation.attributes.result_text_under_image": "texto bajo la imagen",
  "validation.attributes.role": "rol",
  "validation.attributes.rule": "regla",
  "validation.attributes.rules": "reglas",
  "validation.attributes.second": "segundo",
  "validation.attributes.sex": "sexo",
  "validation.attributes.shipment": "envío",
  "validation.attributes.short_text": "texto corto",
  "validation.attributes.size": "tamaño",
  "validation.attributes.skills": "habilidades",
  "validation.attributes.slug": "slug",
  "validation.attributes.specialization": "especialización",
  "validation.attributes.started_at": "comenzado el",
  "validation.attributes.state": "estado",
  "validation.attributes.status": "estado",
  "validation.attributes.street": "calle",
  "validation.attributes.student": "estudiante",
  "validation.attributes.subject": "asunto",
  "validation.attributes.tag": "etiqueta",
  "validation.attributes.tags": "etiquetas",
  "validation.attributes.teacher": "profesor",
  "validation.attributes.terms": "términos",
  "validation.attributes.test_description": "descripción de prueba",
  "validation.attributes.test_locale": "idioma de prueba",
  "validation.attributes.test_name": "nombre de prueba",
  "validation.attributes.text": "texto",
  "validation.attributes.time": "hora",
  "validation.attributes.title": "título",
  "validation.attributes.type": "tipo",
  "validation.attributes.updated_at": "actualizado el",
  "validation.attributes.user": "usuario",
  "validation.attributes.username": "usuario",
  "validation.attributes.value": "valor",
  "validation.attributes.winner": "ganador",
  "validation.attributes.work": "trabajo",
  "validation.attributes.year": "año"
};
const __vite_glob_1_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_es
}, Symbol.toStringTag, { value: "Module" }));
const php_pl = {
  "actions.accept": "Akceptuj",
  "actions.action": "Akcja",
  "actions.actions": "Akcje",
  "actions.add": "Dodaj",
  "actions.admin": "Administrator",
  "actions.agree": "Zgadzam się",
  "actions.archive": "Archiwizuj",
  "actions.assign": "Przydziel",
  "actions.associate": "Współpracownik",
  "actions.attach": "Dołącz",
  "actions.browse": "Przeglądaj",
  "actions.cancel": "Anuluj",
  "actions.choose": "Wybierz",
  "actions.choose_file": "Wybierz plik",
  "actions.choose_image": "Wybierz obraz",
  "actions.click_to_copy": "Kliknij, aby skopiować",
  "actions.close": "Zamknij",
  "actions.collapse": "Zwiń",
  "actions.collapse_all": "Zwiń wszystko",
  "actions.comment": "Skomentuj",
  "actions.confirm": "Potwierdź",
  "actions.connect": "Połącz",
  "actions.create": "Utwórz",
  "actions.delete": "Usuń",
  "actions.detach": "Odłącz",
  "actions.details": "Szczegóły",
  "actions.disable": "Wyłącz",
  "actions.discard": "Odrzuć",
  "actions.done": "Gotowe",
  "actions.down": "W dół",
  "actions.duplicate": "Duplikuj",
  "actions.edit": "Edytuj",
  "actions.enable": "Włącz",
  "actions.expand": "Rozwiń",
  "actions.expand_all": "Rozwiń wszystko",
  "actions.explanation": "Wyjaśnienie",
  "actions.export": "Eksportuj",
  "actions.file": "Plik",
  "actions.files": "Pliki",
  "actions.go_home": "Idź do strony głównej",
  "actions.hide": "Ukryj",
  "actions.home": "Strona główna",
  "actions.image": "Obraz",
  "actions.impersonate": "Podszywaj się",
  "actions.impersonation": "Podszywanie się",
  "actions.import": "Importuj",
  "actions.introduction": "Wprowadzenie",
  "actions.like": "Lubię",
  "actions.load": "Załaduj",
  "actions.localize": "Zlokalizuj",
  "actions.log_in": "Zaloguj sie",
  "actions.log_out": "Wyloguj",
  "actions.named.add": "Dodaj :name",
  "actions.named.choose": "Wybierz :name",
  "actions.named.create": "Utwórz :name",
  "actions.named.delete": "Usuń :name",
  "actions.named.duplicate": "Duplikuj :name",
  "actions.named.edit": "Edytuj :name",
  "actions.named.export": "Export :name",
  "actions.named.hide": "Ukryj :name",
  "actions.named.import": "Importuj :name",
  "actions.named.new": "Nowy :name",
  "actions.named.restore": "Przywróć :name",
  "actions.named.save": "Zapisz :name",
  "actions.named.search": "Szukaj :name",
  "actions.named.show": "Pokaż :name",
  "actions.named.update": "Aktualizuj :name",
  "actions.named.view": "Zobacz :name",
  "actions.new": "Nowy",
  "actions.no": "Nie",
  "actions.open": "Otwórz",
  "actions.open_website": "Otwórz na stronie",
  "actions.preview": "Podgląd",
  "actions.price": "Cena",
  "actions.record": "Nagrywać",
  "actions.restore": "Przywróć",
  "actions.save": "Zapisz",
  "actions.save_and_close": "Zapisz i zamknij",
  "actions.save_and_return": "Zapisz i wróć",
  "actions.search": "Szukaj",
  "actions.select": "Wybierz",
  "actions.select_all": "Zaznacz wszystko",
  "actions.send": "Wyślij",
  "actions.settings": "Ustawienia",
  "actions.show": "Pokaż",
  "actions.show_all": "Pokaż wszystko",
  "actions.sign_in": "Zalogować się",
  "actions.solve": "Rozwiąż",
  "actions.start": "Początek",
  "actions.stop": "Zatrzymywać się",
  "actions.submit": "Zatwierdź",
  "actions.subscribe": "Subskrybuj",
  "actions.switch": "Przełącz",
  "actions.switch_to_role": "Przełącz na rolę",
  "actions.tag": "Tag",
  "actions.tags": "Tagi",
  "actions.target_link.blank": "Otwórz w nowym oknie",
  "actions.target_link.parent": "Otwórz w ramce nadrzędnej",
  "actions.target_link.self": "Otwórz w bieżącym oknie",
  "actions.target_link.top": "Otwórz w najwyższej ramce",
  "actions.translate": "Przetłumacz",
  "actions.translate_it": "Przetłumacz to",
  "actions.unpack": "Rozpakuj",
  "actions.unsubscribe": "Wypisz się",
  "actions.up": "W górę",
  "actions.update": "Aktualizuj",
  "actions.user": "Użytkownik",
  "actions.view": "Widok",
  "actions.yes": "Tak",
  "auth.failed": "Błędny login lub hasło.",
  "auth.password": "Hasło jest nieprawidłowe.",
  "auth.throttle": "Za dużo nieudanych prób logowania. Proszę spróbować za :seconds sekund.",
  "http-statuses.0": "Nieznany błąd",
  "http-statuses.100": "Kontynuuj",
  "http-statuses.101": "Przełączanie protokołów",
  "http-statuses.102": "Przetwarzanie",
  "http-statuses.200": "OK",
  "http-statuses.201": "Utworzono",
  "http-statuses.202": "Zaakceptowano",
  "http-statuses.203": "Nieautorytatywne informacje",
  "http-statuses.204": "Brak treści",
  "http-statuses.205": "Zresetuj zawartość",
  "http-statuses.206": "Częściowa zawartość",
  "http-statuses.207": "Wielostanowy status",
  "http-statuses.208": "Już zgłoszone",
  "http-statuses.226": "Użyto zasobów IM",
  "http-statuses.300": "Zobacz inny zasób",
  "http-statuses.301": "Przeniesiony na stałe",
  "http-statuses.302": "Znaleziono",
  "http-statuses.303": "Zobacz inne",
  "http-statuses.304": "Niezmodyfikowany",
  "http-statuses.305": "Użyj serwera proxy",
  "http-statuses.307": "Tymczasowe przekierowanie",
  "http-statuses.308": "Stałe przekierowanie",
  "http-statuses.400": "Nieprawidłowe żądanie",
  "http-statuses.401": "Nieautoryzowany",
  "http-statuses.402": "Płatność wymagana",
  "http-statuses.403": "Zabroniony",
  "http-statuses.404": "Nie znaleziono",
  "http-statuses.405": "Metoda Niedozwolona",
  "http-statuses.406": "Niedopuszczalne",
  "http-statuses.407": "Wymagane Uwierzytelnianie Proxy",
  "http-statuses.408": "Limit czasu żądania został przekroczony",
  "http-statuses.409": "Konflikt",
  "http-statuses.410": "Zasób zniknął",
  "http-statuses.411": "Wymagana długość nagłówka",
  "http-statuses.412": "Warunek wstępny nie powiódł się",
  "http-statuses.413": "Ładunek zbyt duży",
  "http-statuses.414": "Zbyt długi identyfikator URI",
  "http-statuses.415": "Nieobsługiwany typ nośnika",
  "http-statuses.416": "Żądany zakres jest nieobsługiwany",
  "http-statuses.417": "Oczekiwanie nie powiodło się",
  "http-statuses.418": "Jestem czajnikiem",
  "http-statuses.419": "Sesja wygasła – wymagane ponowne uwierzytelnienie",
  "http-statuses.421": "Błędnie skierowane żądanie",
  "http-statuses.422": "Podmiot Nieprzetwarzalny",
  "http-statuses.423": "Zasób zablokowany",
  "http-statuses.424": "Nieudana zależność",
  "http-statuses.425": "Żądanie zbyt wcześnie",
  "http-statuses.426": "Wymagana aktualizacja",
  "http-statuses.428": "Wymagany warunek wstępny",
  "http-statuses.429": "Zbyt wiele żądań",
  "http-statuses.431": "Za duże pola nagłówka żądania",
  "http-statuses.444": "Połączenie zamknięte przez serwer bez odpowiedzi",
  "http-statuses.449": "Spróbuj ponownie z",
  "http-statuses.451": "Zasób niedostępny ze względów prawnych",
  "http-statuses.499": "Żądanie klienta zostało anulowane",
  "http-statuses.500": "Wewnętrzny błąd serwera",
  "http-statuses.501": "Nie zaimplementowano",
  "http-statuses.502": "Zła brama",
  "http-statuses.503": "Serwer w trybie konserwacji",
  "http-statuses.504": "Przekroczenie limitu czasu bramy",
  "http-statuses.505": "Wersja HTTP nie jest obsługiwana",
  "http-statuses.506": "Wariant również negocjuje",
  "http-statuses.507": "Niewystarczające miejsce do przechowywania",
  "http-statuses.508": "Wykryto zapętloną zależność",
  "http-statuses.509": "Przekroczono limit przepustowości",
  "http-statuses.510": "Nie rozszerzona",
  "http-statuses.511": "Wymagane Uwierzytelnianie Sieci",
  "http-statuses.520": "Nieznany błąd serwera",
  "http-statuses.521": "Serwer sieciowy nie działa",
  "http-statuses.522": "Przekroczono limit czasu połączenia z serwerem",
  "http-statuses.523": "Serwer źródłowy jest nieosiągalny",
  "http-statuses.524": "Przekroczono limit czasu oczekiwania na odpowiedź",
  "http-statuses.525": "Nieudane uzgadnianie SSL",
  "http-statuses.526": "Nieprawidłowy certyfikat SSL",
  "http-statuses.527": "Błąd Railguna",
  "http-statuses.598": "Błąd limitu czasu odczytu sieci",
  "http-statuses.599": "Błąd limitu czasu połączenia sieciowego",
  "http-statuses.unknownError": "Nieznany błąd serwera",
  "pagination.next": "Następna &raquo;",
  "pagination.previous": "&laquo; Poprzednia",
  "passwords.reset": "Hasło zostało zresetowane!",
  "passwords.sent": "Przypomnienie hasła zostało wysłane!",
  "passwords.throttled": "Proszę zaczekać zanim spróbujesz ponownie.",
  "passwords.token": "Token resetowania hasła jest nieprawidłowy.",
  "passwords.user": "Nie znaleziono użytkownika z takim adresem e-mail.",
  "validation.accepted": "Pole :attribute musi zostać zaakceptowane.",
  "validation.accepted_if": "Pole :attribute musi zostać zaakceptowane gdy :other ma wartość :value.",
  "validation.active_url": "Pole :attribute jest nieprawidłowym adresem URL.",
  "validation.after": "Pole :attribute musi być datą późniejszą od :date.",
  "validation.after_or_equal": "Pole :attribute musi być datą nie wcześniejszą niż :date.",
  "validation.alpha": "Pole :attribute może zawierać jedynie litery.",
  "validation.alpha_dash": "Pole :attribute może zawierać jedynie litery, cyfry i myślniki.",
  "validation.alpha_num": "Pole :attribute może zawierać jedynie litery i cyfry.",
  "validation.any_of": "Pole :attribute ma nieprawidłową wartość.",
  "validation.array": "Pole :attribute musi być tablicą.",
  "validation.ascii": "Pole :attribute może zawierać tylko jednobajtowe znaki alfanumeryczne i symbole.",
  "validation.attributes.address": "adres",
  "validation.attributes.affiliate_url": "adres URL partnera",
  "validation.attributes.age": "wiek",
  "validation.attributes.amount": "ilość",
  "validation.attributes.announcement": "ogłoszenie",
  "validation.attributes.area": "obszar",
  "validation.attributes.audience_prize": "nagroda publiczności",
  "validation.attributes.audience_winner": "zwycięzca publiczności",
  "validation.attributes.available": "dostępny",
  "validation.attributes.birthday": "urodziny",
  "validation.attributes.body": "treść",
  "validation.attributes.city": "miasto",
  "validation.attributes.company": "firma",
  "validation.attributes.compilation": "kompilacja",
  "validation.attributes.concept": "pojęcie",
  "validation.attributes.conditions": "warunki",
  "validation.attributes.content": "zawartość",
  "validation.attributes.contest": "konkurs",
  "validation.attributes.country": "kraj",
  "validation.attributes.cover": "okładka",
  "validation.attributes.created_at": "utworzono",
  "validation.attributes.creator": "twórca",
  "validation.attributes.currency": "waluta",
  "validation.attributes.current_password": "aktualne hasło",
  "validation.attributes.customer": "klient",
  "validation.attributes.date": "data",
  "validation.attributes.date_of_birth": "data urodzenia",
  "validation.attributes.dates": "daty",
  "validation.attributes.day": "dzień",
  "validation.attributes.deleted_at": "skasowano",
  "validation.attributes.description": "opis",
  "validation.attributes.display_type": "typ wyświetlacza",
  "validation.attributes.district": "dzielnica",
  "validation.attributes.duration": "czas trwania",
  "validation.attributes.email": "adres e-mail",
  "validation.attributes.excerpt": "wyciąg",
  "validation.attributes.filter": "filtr",
  "validation.attributes.finished_at": "zakończono o",
  "validation.attributes.first_name": "imię",
  "validation.attributes.gender": "płeć",
  "validation.attributes.grand_prize": "nagroda główna",
  "validation.attributes.group": "grupa",
  "validation.attributes.hour": "godzina",
  "validation.attributes.image": "obrazek",
  "validation.attributes.image_desktop": "obraz pulpitu",
  "validation.attributes.image_main": "główny obraz",
  "validation.attributes.image_mobile": "obraz mobilny",
  "validation.attributes.images": "obrazy",
  "validation.attributes.is_audience_winner": "jest zwycięzcą publiczności",
  "validation.attributes.is_hidden": "jest ukryty",
  "validation.attributes.is_subscribed": "jest zapisany",
  "validation.attributes.is_visible": "jest widoczny",
  "validation.attributes.is_winner": "jest zwycięzcą",
  "validation.attributes.items": "elementy",
  "validation.attributes.key": "klucz",
  "validation.attributes.last_name": "nazwisko",
  "validation.attributes.lesson": "lekcja",
  "validation.attributes.line_address_1": "linia adresu 1",
  "validation.attributes.line_address_2": "linia adresu 2",
  "validation.attributes.login": "Zaloguj się",
  "validation.attributes.message": "wiadomość",
  "validation.attributes.middle_name": "drugie imię",
  "validation.attributes.minute": "minuta",
  "validation.attributes.mobile": "numer telefonu komórkowego",
  "validation.attributes.month": "miesiąc",
  "validation.attributes.name": "nazwa",
  "validation.attributes.national_code": "kod kraju",
  "validation.attributes.number": "numer",
  "validation.attributes.password": "hasło",
  "validation.attributes.password_confirmation": "potwierdzenie hasła",
  "validation.attributes.phone": "numer telefonu",
  "validation.attributes.photo": "zdjęcie",
  "validation.attributes.portfolio": "portfolio",
  "validation.attributes.postal_code": "kod pocztowy",
  "validation.attributes.preview": "podgląd",
  "validation.attributes.price": "cena",
  "validation.attributes.product_id": "ID produktu",
  "validation.attributes.product_uid": "UID produktu",
  "validation.attributes.product_uuid": "UUID produktu",
  "validation.attributes.promo_code": "kod promocyjny",
  "validation.attributes.province": "województwo lub stan",
  "validation.attributes.quantity": "ilość",
  "validation.attributes.reason": "powód",
  "validation.attributes.recaptcha_response_field": "pole odpowiedzi reCAPTCHA",
  "validation.attributes.referee": "sędzia",
  "validation.attributes.referees": "sędziowie",
  "validation.attributes.reject_reason": "powód odrzucenia",
  "validation.attributes.remember": "zapamiętaj",
  "validation.attributes.restored_at": "odtworzono",
  "validation.attributes.result_text_under_image": "wynikowy tekst pod obrazkiem",
  "validation.attributes.role": "rola",
  "validation.attributes.rule": "reguła",
  "validation.attributes.rules": "zasady",
  "validation.attributes.second": "sekunda",
  "validation.attributes.sex": "płeć",
  "validation.attributes.shipment": "wysyłka",
  "validation.attributes.short_text": "krótki tekst",
  "validation.attributes.size": "rozmiar",
  "validation.attributes.skills": "umiejętności",
  "validation.attributes.slug": "przyjazny URL",
  "validation.attributes.specialization": "specjalizacja",
  "validation.attributes.started_at": "rozpoczęto o",
  "validation.attributes.state": "stan",
  "validation.attributes.status": "status",
  "validation.attributes.street": "ulica",
  "validation.attributes.student": "uczeń",
  "validation.attributes.subject": "temat",
  "validation.attributes.tag": "tag",
  "validation.attributes.tags": "tagi",
  "validation.attributes.teacher": "nauczyciel",
  "validation.attributes.terms": "warunki",
  "validation.attributes.test_description": "testowy opis",
  "validation.attributes.test_locale": "testowa lokalizacja",
  "validation.attributes.test_name": "testowe imię",
  "validation.attributes.text": "tekst",
  "validation.attributes.time": "czas",
  "validation.attributes.title": "tytuł",
  "validation.attributes.type": "typ",
  "validation.attributes.updated_at": "zaktualizowano",
  "validation.attributes.user": "użytkownik",
  "validation.attributes.username": "nazwa użytkownika",
  "validation.attributes.value": "wartość",
  "validation.attributes.winner": "zwycięzca",
  "validation.attributes.work": "praca",
  "validation.attributes.year": "rok",
  "validation.before": "Pole :attribute musi być datą wcześniejszą od :date.",
  "validation.before_or_equal": "Pole :attribute musi być datą nie późniejszą niż :date.",
  "validation.between.array": "Pole :attribute musi składać się z :min - :max elementów.",
  "validation.between.file": "Pole :attribute musi zawierać się w granicach :min - :max kilobajtów.",
  "validation.between.numeric": "Pole :attribute musi zawierać się w granicach :min - :max.",
  "validation.between.string": "Pole :attribute musi zawierać się w granicach :min - :max znaków.",
  "validation.boolean": "Pole :attribute musi mieć wartość logiczną prawda albo fałsz.",
  "validation.can": "Pole :attribute zawiera nieautoryzowaną wartość.",
  "validation.confirmed": "Potwierdzenie pola :attribute nie zgadza się.",
  "validation.contains": "Pole :attribute nie zawiera wymaganego elementu.",
  "validation.current_password": "Hasło jest nieprawidłowe.",
  "validation.date": "Pole :attribute nie jest prawidłową datą.",
  "validation.date_equals": "Pole :attribute musi być datą równą :date.",
  "validation.date_format": "Pole :attribute nie jest w formacie :format.",
  "validation.decimal": "Pole :attribute musi mieć :decimal miejsc po przecinku.",
  "validation.declined": "Pole :attribute musi zostać odrzucone.",
  "validation.declined_if": "Pole :attribute musi zostać odrzucone, gdy :other ma wartość :value.",
  "validation.different": "Pole :attribute oraz :other muszą się różnić.",
  "validation.digits": "Pole :attribute musi składać się z :digits cyfr.",
  "validation.digits_between": "Pole :attribute musi mieć od :min do :max cyfr.",
  "validation.dimensions": "Pole :attribute ma niepoprawne wymiary.",
  "validation.distinct": "Pole :attribute ma zduplikowane wartości.",
  "validation.doesnt_contain": "Pole :attribute nie może zawierać żadnej z następujących wartości: :values.",
  "validation.doesnt_end_with": "Pole :attribute nie może kończyć się jedną z następujących wartości: :values.",
  "validation.doesnt_start_with": "Pole :attribute nie może zaczynać się od jednego z następujących wartości: :values.",
  "validation.email": "Pole :attribute nie jest poprawnym adresem e-mail.",
  "validation.ends_with": "Pole :attribute musi kończyć się jedną z następujących wartości: :values.",
  "validation.enum": "Pole :attribute ma niepoprawną wartość.",
  "validation.exists": "Zaznaczone pole :attribute jest nieprawidłowe.",
  "validation.extensions": "Pole :attribute musi mieć jedno z następujących rozszerzeń: :values.",
  "validation.file": "Pole :attribute musi być plikiem.",
  "validation.filled": "Pole :attribute musi być wypełnione.",
  "validation.gt.array": "Pole :attribute musi mieć więcej niż :value elementów.",
  "validation.gt.file": "Pole :attribute musi być większe niż :value kilobajtów.",
  "validation.gt.numeric": "Pole :attribute musi być większe niż :value.",
  "validation.gt.string": "Pole :attribute musi być dłuższe niż :value znaków.",
  "validation.gte.array": "Pole :attribute musi mieć :value lub więcej elementów.",
  "validation.gte.file": "Pole :attribute musi być większe lub równe :value kilobajtów.",
  "validation.gte.numeric": "Pole :attribute musi być większe lub równe :value.",
  "validation.gte.string": "Pole :attribute musi być dłuższe lub równe :value znaków.",
  "validation.hex_color": "Pole :attribute musi mieć podany prawidłowy kolor w formacie szesnastkowym.",
  "validation.image": "Pole :attribute musi być obrazkiem.",
  "validation.in": "Zaznaczony element :attribute jest nieprawidłowy.",
  "validation.in_array": "Pole :attribute nie znajduje się w :other.",
  "validation.in_array_keys": "Pole :attribute musi zawierać co najmniej jeden z następujących kluczy: :values.",
  "validation.integer": "Pole :attribute musi być liczbą całkowitą.",
  "validation.ip": "Pole :attribute musi być prawidłowym adresem IP.",
  "validation.ipv4": "Pole :attribute musi być prawidłowym adresem IPv4.",
  "validation.ipv6": "Pole :attribute musi być prawidłowym adresem IPv6.",
  "validation.json": "Pole :attribute musi być poprawnym ciągiem znaków JSON.",
  "validation.list": "Pole :attribute musi zawierać listę wartości.",
  "validation.lowercase": "Pole :attribute musi być zapisane małymi literami.",
  "validation.lt.array": "Pole :attribute musi mieć mniej niż :value elementów.",
  "validation.lt.file": "Pole :attribute musi być mniejsze niż :value kilobajtów.",
  "validation.lt.numeric": "Pole :attribute musi być mniejsze niż :value.",
  "validation.lt.string": "Pole :attribute musi być krótsze niż :value znaków.",
  "validation.lte.array": "Pole :attribute musi mieć :value lub mniej elementów.",
  "validation.lte.file": "Pole :attribute musi być mniejsze lub równe :value kilobajtów.",
  "validation.lte.numeric": "Pole :attribute musi być mniejsze lub równe :value.",
  "validation.lte.string": "Pole :attribute musi być krótsze lub równe :value znaków.",
  "validation.mac_address": "Pole :attribute musi być prawidłowym adresem MAC.",
  "validation.max.array": "Pole :attribute nie może mieć więcej niż :max elementów.",
  "validation.max.file": "Pole :attribute nie może być większe niż :max kilobajtów.",
  "validation.max.numeric": "Pole :attribute nie może być większe niż :max.",
  "validation.max.string": "Pole :attribute nie może być dłuższe niż :max znaków.",
  "validation.max_digits": "Pole :attribute nie może mieć więcej niż :max cyfr.",
  "validation.mimes": "Pole :attribute musi być plikiem typu :values.",
  "validation.mimetypes": "Pole :attribute musi być plikiem typu :values.",
  "validation.min.array": "Pole :attribute musi mieć przynajmniej :min elementów.",
  "validation.min.file": "Pole :attribute musi mieć przynajmniej :min kilobajtów.",
  "validation.min.numeric": "Pole :attribute musi być nie mniejsze od :min.",
  "validation.min.string": "Pole :attribute musi mieć przynajmniej :min znaków.",
  "validation.min_digits": "Pole :attribute musi mieć co najmniej :min cyfr.",
  "validation.missing": "Musi brakować pola :attribute.",
  "validation.missing_if": "Jeśli :other to :value, musi brakować pola :attribute.",
  "validation.missing_unless": "Musi brakować pola :attribute, chyba że :other to :value.",
  "validation.missing_with": "Jeśli występuje wartość :values, musi brakować pola :attribute.",
  "validation.missing_with_all": "Jeśli występuje :values, musi brakować pola :attribute.",
  "validation.multiple_of": "Pole :attribute musi być wielokrotnością wartości :value.",
  "validation.not_in": "Zaznaczony :attribute jest nieprawidłowy.",
  "validation.not_regex": "Format pola :attribute jest nieprawidłowy.",
  "validation.numeric": "Pole :attribute musi być liczbą.",
  "validation.password.letters": "Pole :attribute musi zawierać przynajmniej jedną literę.",
  "validation.password.mixed": "Pole :attribute musi zawierać przynajmniej jedną wielką i jedną małą literę.",
  "validation.password.numbers": "Pole :attribute musi zawierać przynajmniej jedną liczbę.",
  "validation.password.symbols": "Pole :attribute musi zawierać przynajmniej jeden symbol.",
  "validation.password.uncompromised": "Podany :attribute pojawił się w wycieku danych. Proszę wybrać inną wartość :attribute.",
  "validation.present": "Pole :attribute musi być obecne.",
  "validation.present_if": "Pole :attribute musi być obecne jeżeli :other ma wartość :value.",
  "validation.present_unless": "Pole :attribute musi być obecne, chyba że :other ma wartość :value.",
  "validation.present_with": "Pole :attribute musi być obecne, gdy :values jest podane.",
  "validation.present_with_all": "Pole :attribute musi być obecne kiedy :values są podane.",
  "validation.prohibited": "Pole :attribute jest zabronione.",
  "validation.prohibited_if": "Pole :attribute jest zabronione, gdy :other to :value.",
  "validation.prohibited_if_accepted": "Pole :attribute jest zabronione, gdy akceptowane jest pole :other.",
  "validation.prohibited_if_declined": "Pole :attribute jest zabronione, gdy odrzucono pole :other.",
  "validation.prohibited_unless": "Pole :attribute jest zabronione, chyba że :other jest w :values.",
  "validation.prohibits": "Pole :attribute wyklucza obecność :other.",
  "validation.regex": "Format pola :attribute jest nieprawidłowy.",
  "validation.required": "Pole :attribute jest wymagane.",
  "validation.required_array_keys": "Pole :attribute musi zawierać wartości: :values.",
  "validation.required_if": "Pole :attribute jest wymagane gdy :other ma wartość :value.",
  "validation.required_if_accepted": "Pole :attribute jest wymagane, gdy :other jest zaakceptowane.",
  "validation.required_if_declined": "Pole :attribute jest wymagane gdy :other jest odrzucone.",
  "validation.required_unless": "Pole :attribute jest wymagane jeżeli :other nie znajduje się w :values.",
  "validation.required_with": "Pole :attribute jest wymagane gdy wartość :values jest obecna.",
  "validation.required_with_all": "Pole :attribute jest wymagane gdy wszystkie wartości :values są obecne.",
  "validation.required_without": "Pole :attribute jest wymagane gdy wartość :values nie jest obecna.",
  "validation.required_without_all": "Pole :attribute jest wymagane gdy żadne z wartości :values nie są obecne.",
  "validation.same": "Pole :attribute i :other muszą być takie same.",
  "validation.size.array": "Pole :attribute musi zawierać :size elementów.",
  "validation.size.file": "Pole :attribute musi mieć :size kilobajtów.",
  "validation.size.numeric": "Pole :attribute musi mieć :size.",
  "validation.size.string": "Pole :attribute musi mieć :size znaków.",
  "validation.starts_with": "Pole :attribute musi zaczynać się jedną z następujących wartości: :values.",
  "validation.string": "Pole :attribute musi być ciągiem znaków.",
  "validation.timezone": "Pole :attribute musi być prawidłową strefą czasową.",
  "validation.ulid": "Pole :attribute musi być prawidłowym identyfikatorem ULID.",
  "validation.unique": "Taki :attribute już występuje.",
  "validation.uploaded": "Nie udało się wgrać pliku :attribute.",
  "validation.uppercase": "Pole :attribute musi być zapisane wielkimi literami.",
  "validation.url": "Format pola :attribute jest nieprawidłowy.",
  "validation.uuid": "Pole :attribute musi być poprawnym identyfikatorem UUID."
};
const __vite_glob_1_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_pl
}, Symbol.toStringTag, { value: "Module" }));
const php_ru = {
  "actions.accept": "Принять",
  "actions.action": "Действие",
  "actions.actions": "Действия",
  "actions.add": "Добавить",
  "actions.admin": "Панель администратора",
  "actions.agree": "Согласен(на)",
  "actions.archive": "Архив",
  "actions.assign": "Назначить",
  "actions.associate": "Ассоциировать",
  "actions.attach": "Прикрепить",
  "actions.browse": "Просмотр",
  "actions.cancel": "Отмена",
  "actions.choose": "Выбрать",
  "actions.choose_file": "Выбрать файл",
  "actions.choose_image": "Выбрать изображение",
  "actions.click_to_copy": "Скопировать",
  "actions.close": "Закрыть",
  "actions.collapse": "Свернуть",
  "actions.collapse_all": "Свернуть всё",
  "actions.comment": "Комментарий",
  "actions.confirm": "Подтвердить",
  "actions.connect": "Подключить",
  "actions.create": "Создать",
  "actions.delete": "Удалить",
  "actions.detach": "Открепить",
  "actions.details": "Подробнее",
  "actions.disable": "Отключить",
  "actions.discard": "Отказаться",
  "actions.done": "Готово",
  "actions.down": "Вниз",
  "actions.duplicate": "Дублировать",
  "actions.edit": "Редактировать",
  "actions.enable": "Включить",
  "actions.expand": "Раскрыть",
  "actions.expand_all": "Раскрыть всё",
  "actions.explanation": "Объяснить",
  "actions.export": "Экспорт",
  "actions.file": "Файл",
  "actions.files": "Файлы",
  "actions.go_home": "Вернуться на главную",
  "actions.hide": "Скрыть",
  "actions.home": "На главную",
  "actions.image": "Изображение",
  "actions.impersonate": "Войти под пользователем",
  "actions.impersonation": "Войти под пользователем",
  "actions.import": "Импорт",
  "actions.introduction": "Введение",
  "actions.like": "Нравится",
  "actions.load": "Загрузить",
  "actions.localize": "Локализовать",
  "actions.log_in": "Войти",
  "actions.log_out": "Выйти",
  "actions.named.add": "Добавить :name",
  "actions.named.choose": "Выбрать :name",
  "actions.named.create": "Создать :name",
  "actions.named.delete": "Удалить :name",
  "actions.named.duplicate": "Дублировать :name",
  "actions.named.edit": "Редактировать :name",
  "actions.named.export": "Экспортировать :name",
  "actions.named.hide": "Скрыть :name",
  "actions.named.import": "Импорт :name",
  "actions.named.new": "Новый :name",
  "actions.named.restore": "Восстановить :name",
  "actions.named.save": "Сохранить :name",
  "actions.named.search": "Искать :name",
  "actions.named.show": "Показать :name",
  "actions.named.update": "Обновить :name",
  "actions.named.view": "Просмотреть :name",
  "actions.new": "Новый",
  "actions.no": "Нет",
  "actions.open": "Открыть",
  "actions.open_website": "Открыть на сайте",
  "actions.preview": "Предпросмотр",
  "actions.price": "Цена",
  "actions.record": "Запись",
  "actions.restore": "Восстановить",
  "actions.save": "Сохранить",
  "actions.save_and_close": "Сохранить и закрыть",
  "actions.save_and_return": "Сохранить и вернуться",
  "actions.search": "Поиск",
  "actions.select": "Выбрать",
  "actions.select_all": "Выбрать всё",
  "actions.send": "Отправить",
  "actions.settings": "Настройки",
  "actions.show": "Показать",
  "actions.show_all": "Показать всё",
  "actions.sign_in": "Регистрация",
  "actions.solve": "Решить",
  "actions.start": "Начать",
  "actions.stop": "Остановить",
  "actions.submit": "Отправить",
  "actions.subscribe": "Подписаться",
  "actions.switch": "Переключить",
  "actions.switch_to_role": "Переключиться на роль",
  "actions.tag": "Тег",
  "actions.tags": "Теги",
  "actions.target_link.blank": "Открыть в новом окне",
  "actions.target_link.parent": "Открыть в родительском фрейме",
  "actions.target_link.self": "Открыть в текущем окне",
  "actions.target_link.top": "Открыть в главном фрейме",
  "actions.translate": "Перевод",
  "actions.translate_it": "Перевести",
  "actions.unpack": "Распаковать",
  "actions.unsubscribe": "Отписаться",
  "actions.up": "Вверх",
  "actions.update": "Обновить",
  "actions.user": "Пользователь",
  "actions.view": "Просмотр",
  "actions.yes": "Да",
  "auth.failed": "Неверное имя пользователя или пароль.",
  "auth.password": "Некорректный пароль.",
  "auth.throttle": "Слишком много попыток входа. Пожалуйста, попробуйте ещё раз через :seconds секунд.",
  "http-statuses.0": "Неизвестная ошибка",
  "http-statuses.100": "Продолжить",
  "http-statuses.101": "Переключение протоколов",
  "http-statuses.102": "Идет обработка",
  "http-statuses.200": "ОК",
  "http-statuses.201": "Создано",
  "http-statuses.202": "Принято",
  "http-statuses.203": "Информация не авторитетна",
  "http-statuses.204": "Содержимое отсутствует",
  "http-statuses.205": "Сброс содержимого",
  "http-statuses.206": "Не полное содержимое",
  "http-statuses.207": "Много статусов",
  "http-statuses.208": "Уже сообщалось",
  "http-statuses.226": "Использовано IM",
  "http-statuses.300": "Много вариантов",
  "http-statuses.301": "Перемещено навсегда",
  "http-statuses.302": "Найдено",
  "http-statuses.303": "Смотри другое",
  "http-statuses.304": "Не изменялось",
  "http-statuses.305": "Используй прокси",
  "http-statuses.307": "Временное перенаправление",
  "http-statuses.308": "Постоянное перенаправление",
  "http-statuses.400": "Некорректный запрос",
  "http-statuses.401": "Не авторизован",
  "http-statuses.402": "Необходима оплата",
  "http-statuses.403": "Доступ запрещен",
  "http-statuses.404": "Не найдено",
  "http-statuses.405": "Метод запрещён",
  "http-statuses.406": "Неприемлемо",
  "http-statuses.407": "Требуется аутентификация прокси",
  "http-statuses.408": "Истекло время ожидания",
  "http-statuses.409": "Конфликт",
  "http-statuses.410": "Удалено",
  "http-statuses.411": "Необходима длина",
  "http-statuses.412": "Условие ложно",
  "http-statuses.413": "Большой объём данных",
  "http-statuses.414": "URI слишком длинный",
  "http-statuses.415": "Неподдерживаемый тип данных",
  "http-statuses.416": "Диапазон недостижим",
  "http-statuses.417": "Истекло время ожидания",
  "http-statuses.418": "Я - чайник",
  "http-statuses.419": "Сессия устарела",
  "http-statuses.421": "Неверный запрос",
  "http-statuses.422": "Необрабатываемый экземпляр",
  "http-statuses.423": "Доступ заблокирован",
  "http-statuses.424": "Ошибка зависимости",
  "http-statuses.425": "Слишком рано",
  "http-statuses.426": "Требуется обновление",
  "http-statuses.428": "Требуется предусловие",
  "http-statuses.429": "Слишком много запросов",
  "http-statuses.431": "Поля заголовка слишком большие",
  "http-statuses.444": "Соединение закрыто без ответа",
  "http-statuses.449": "Повторить с",
  "http-statuses.451": "Недоступно по юридическим причинам",
  "http-statuses.499": "Запрос закрыт клиентом",
  "http-statuses.500": "Внутренняя ошибка",
  "http-statuses.501": "Не реализовано",
  "http-statuses.502": "Проблема с шлюзом",
  "http-statuses.503": "Ведутся технические работы",
  "http-statuses.504": "Шлюз не отвечает",
  "http-statuses.505": "Версия HTTP не поддерживается",
  "http-statuses.506": "Вариант тоже проводит согласование",
  "http-statuses.507": "Переполнение хранилища",
  "http-statuses.508": "Обнаружен бесконечный цикл",
  "http-statuses.509": "Превышена нагрузка на канал связи",
  "http-statuses.510": "Не расширено",
  "http-statuses.511": "Требуется сетевая аутентификация",
  "http-statuses.520": "Неизвестная ошибка",
  "http-statuses.521": "Веб-сервер не работает",
  "http-statuses.522": "Соединение не отвечает",
  "http-statuses.523": "Источник недоступен",
  "http-statuses.524": "Истекло время ожидания",
  "http-statuses.525": "Квитирование SSL не удалось",
  "http-statuses.526": "Недействительный SSL сертификат",
  "http-statuses.527": "Ошибка соединения с Railgun",
  "http-statuses.598": "Истекло время ожидания",
  "http-statuses.599": "Истекло время подключения",
  "http-statuses.unknownError": "Неизвестная ошибка",
  "pagination.next": "Вперёд &raquo;",
  "pagination.previous": "&laquo; Назад",
  "passwords.reset": "Ваш пароль был сброшен.",
  "passwords.sent": "Ссылка на сброс пароля была отправлена.",
  "passwords.throttled": "Пожалуйста, подождите перед повторной попыткой.",
  "passwords.token": "Ошибочный код сброса пароля.",
  "passwords.user": "Не удалось найти пользователя с указанным электронным адресом.",
  "validation.accepted": "Вы должны принять :attribute.",
  "validation.accepted_if": "Вы должны принять :attribute, когда :other содержит :value.",
  "validation.active_url": "Значение поля :attribute должно быть действительным URL адресом.",
  "validation.after": "Значение поля :attribute должно быть датой после :date.",
  "validation.after_or_equal": "Значение поля :attribute должно быть датой после или равной :date.",
  "validation.alpha": "Значение поля :attribute может содержать только буквы.",
  "validation.alpha_dash": "Значение поля :attribute может содержать только буквы, цифры, дефис и нижнее подчеркивание.",
  "validation.alpha_num": "Значение поля :attribute может содержать только буквы и цифры.",
  "validation.any_of": "Значение поля :attribute не найдено в списке разрешённых.",
  "validation.array": "Значение поля :attribute должно быть массивом.",
  "validation.ascii": "Значение поля :attribute должно содержать только однобайтовые цифро-буквенные символы.",
  "validation.before": "Значение поля :attribute должно быть датой до :date.",
  "validation.before_or_equal": "Значение поля :attribute должно быть датой до или равной :date.",
  "validation.between.array": "Количество элементов в поле :attribute должно быть от :min до :max.",
  "validation.between.file": "Размер файла в поле :attribute должен быть от :min до :max Кб.",
  "validation.between.numeric": "Значение поля :attribute должно быть от :min до :max.",
  "validation.between.string": "Количество символов в поле :attribute должно быть от :min до :max.",
  "validation.boolean": "Значение поля :attribute должно быть логического типа.",
  "validation.can": "Значение поля :attribute должно быть авторизованным.",
  "validation.confirmed": "Значение поля :attribute не совпадает с подтверждаемым.",
  "validation.contains": "В поле :attribute отсутствует необходимое значение.",
  "validation.current_password": "Неверный пароль.",
  "validation.date": "Значение поля :attribute должно быть корректной датой.",
  "validation.date_equals": "Значение поля :attribute должно быть датой равной :date.",
  "validation.date_format": "Значение поля :attribute должно соответствовать формату даты: :format.",
  "validation.decimal": "Значение поля :attribute должно содержать :decimal цифр десятичных разрядов.",
  "validation.declined": "Значение поля :attribute должно быть отклонено.",
  "validation.declined_if": "Значение поля :attribute должно быть отклонено, когда :other содержит :value.",
  "validation.different": "Значения полей :attribute и :other должны различаться.",
  "validation.digits": "Количество символов в поле :attribute должно быть равным :digits.",
  "validation.digits_between": "Количество символов в поле :attribute должно быть от :min до :max.",
  "validation.dimensions": "Изображение, указанное в поле :attribute, имеет недопустимые размеры.",
  "validation.distinct": "Элементы в значении поля :attribute не должны повторяться.",
  "validation.doesnt_contain": "Значение поля :attribute не должно содержать ни одного из следующих элементов: :values.",
  "validation.doesnt_end_with": "Значение поля :attribute не должно заканчиваться одним из следующих: :values.",
  "validation.doesnt_start_with": "Значение поля :attribute не должно начинаться с одного из следующих: :values.",
  "validation.email": "Значение поля :attribute должно быть действительным электронным адресом.",
  "validation.ends_with": "Значение поля :attribute должно заканчиваться одним из следующих: :values",
  "validation.enum": "Значение поля :attribute отсутствует в списке разрешённых.",
  "validation.exists": "Значение поля :attribute не существует.",
  "validation.extensions": "Файл в поле :attribute должен иметь одно из следующих расширений: :values.",
  "validation.file": "В поле :attribute должен быть указан файл.",
  "validation.filled": "Значение поля :attribute обязательно для заполнения.",
  "validation.gt.array": "Количество элементов в поле :attribute должно быть больше :value.",
  "validation.gt.file": "Размер файла, указанный в поле :attribute, должен быть больше :value Кб.",
  "validation.gt.numeric": "Значение поля :attribute должно быть больше :value.",
  "validation.gt.string": "Количество символов в поле :attribute должно быть больше :value.",
  "validation.gte.array": "Количество элементов в поле :attribute должно быть :value или больше.",
  "validation.gte.file": "Размер файла, указанный в поле :attribute, должен быть :value Кб или больше.",
  "validation.gte.numeric": "Значение поля :attribute должно быть :value или больше.",
  "validation.gte.string": "Количество символов в поле :attribute должно быть :value или больше.",
  "validation.hex_color": "Значение поля :attribute должно быть корректным цветом в HEX формате.",
  "validation.image": "Файл, указанный в поле :attribute, должен быть изображением.",
  "validation.in": "Значение поля :attribute отсутствует в списке разрешённых.",
  "validation.in_array": "Значение поля :attribute должно быть указано в поле :other.",
  "validation.in_array_keys": "Массив в значении поля :attribute должен иметь как минимум один из следующих ключей: :values.",
  "validation.integer": "Значение поля :attribute должно быть целым числом.",
  "validation.ip": "Значение поля :attribute должно быть действительным IP-адресом.",
  "validation.ipv4": "Значение поля :attribute должно быть действительным IPv4-адресом.",
  "validation.ipv6": "Значение поля :attribute должно быть действительным IPv6-адресом.",
  "validation.json": "Значение поля :attribute должно быть JSON строкой.",
  "validation.list": "Значение поля :attribute должно быть списком.",
  "validation.lowercase": "Значение поля :attribute должно быть в нижнем регистре.",
  "validation.lt.array": "Количество элементов в поле :attribute должно быть меньше :value.",
  "validation.lt.file": "Размер файла, указанный в поле :attribute, должен быть меньше :value Кб.",
  "validation.lt.numeric": "Значение поля :attribute должно быть меньше :value.",
  "validation.lt.string": "Количество символов в поле :attribute должно быть меньше :value.",
  "validation.lte.array": "Количество элементов в поле :attribute должно быть :value или меньше.",
  "validation.lte.file": "Размер файла, указанный в поле :attribute, должен быть :value Кб или меньше.",
  "validation.lte.numeric": "Значение поля :attribute должно быть равным или меньше :value.",
  "validation.lte.string": "Количество символов в поле :attribute должно быть :value или меньше.",
  "validation.mac_address": "Значение поля :attribute должно быть корректным MAC-адресом.",
  "validation.max.array": "Количество элементов в поле :attribute не может превышать :max.",
  "validation.max.file": "Размер файла в поле :attribute не может быть больше :max Кб.",
  "validation.max.numeric": "Значение поля :attribute не может быть больше :max.",
  "validation.max.string": "Количество символов в значении поля :attribute не может превышать :max.",
  "validation.max_digits": "Значение поля :attribute не должно содержать больше :max цифр.",
  "validation.mimes": "Файл, указанный в поле :attribute, должен быть одного из следующих типов: :values.",
  "validation.mimetypes": "Файл, указанный в поле :attribute, должен быть одного из следующих типов: :values.",
  "validation.min.array": "Количество элементов в поле :attribute должно быть не меньше :min.",
  "validation.min.file": "Размер файла, указанный в поле :attribute, должен быть не меньше :min Кб.",
  "validation.min.numeric": "Значение поля :attribute должно быть не меньше :min.",
  "validation.min.string": "Количество символов в поле :attribute должно быть не меньше :min.",
  "validation.min_digits": "Значение поля :attribute должно содержать не меньше :min цифр.",
  "validation.missing": "Значение поля :attribute должно отсутствовать.",
  "validation.missing_if": "Значение поля :attribute должно отсутствовать, когда :other содержит :value.",
  "validation.missing_unless": "Значение поля :attribute должно отсутствовать, когда :other не содержит :value.",
  "validation.missing_with": "Значение поля :attribute должно отсутствовать, если :values указано.",
  "validation.missing_with_all": "Значение поля :attribute должно отсутствовать, когда указаны все :values.",
  "validation.multiple_of": "Значение поля :attribute должно быть кратным :value",
  "validation.not_in": "Значение поля :attribute находится в списке запрета.",
  "validation.not_regex": "Значение поля :attribute имеет некорректный формат.",
  "validation.numeric": "Значение поля :attribute должно быть числом.",
  "validation.password.letters": "Значение поля :attribute должно содержать хотя бы одну букву.",
  "validation.password.mixed": "Значение поля :attribute должно содержать хотя бы одну прописную и одну строчную буквы.",
  "validation.password.numbers": "Значение поля :attribute должно содержать хотя бы одну цифру.",
  "validation.password.symbols": "Значение поля :attribute должно содержать хотя бы один символ.",
  "validation.password.uncompromised": "Значение поля :attribute обнаружено в утёкших данных. Пожалуйста, выберите другое значение для :attribute.",
  "validation.present": "Значение поля :attribute должно быть.",
  "validation.present_if": "Значение поля :attribute должно быть когда :other содержит :value.",
  "validation.present_unless": "Значение поля :attribute должно быть, если только :other не содержит :value.",
  "validation.present_with": "Значение поля :attribute должно быть когда одно из :values присутствуют.",
  "validation.present_with_all": "Значение поля :attribute должно быть когда все из значений присутствуют: :values.",
  "validation.prohibited": "Значение поля :attribute запрещено.",
  "validation.prohibited_if": "Значение поля :attribute запрещено, когда :other содержит :value.",
  "validation.prohibited_if_accepted": "Значение поля :attribute запрещено, если принято :other.",
  "validation.prohibited_if_declined": "Значение поля :attribute запрещено при отказе от :other.",
  "validation.prohibited_unless": "Значение поля :attribute запрещено, если :other не состоит в :values.",
  "validation.prohibits": "Значение поля :attribute запрещает присутствие :other.",
  "validation.regex": "Значение поля :attribute имеет некорректный формат.",
  "validation.required": "Поле :attribute обязательно.",
  "validation.required_array_keys": "Массив, указанный в поле :attribute, обязательно должен иметь ключи: :values",
  "validation.required_if": "Поле :attribute обязательно для заполнения, когда :other содержит :value.",
  "validation.required_if_accepted": "Поле :attribute обязательно, когда :other принято.",
  "validation.required_if_declined": "Поле :attribute обязательно, когда :other отклонено.",
  "validation.required_unless": "Поле :attribute обязательно для заполнения, когда :other не содержит :values.",
  "validation.required_with": "Поле :attribute обязательно для заполнения, когда :values указано.",
  "validation.required_with_all": "Поле :attribute обязательно для заполнения, когда :values указано.",
  "validation.required_without": "Поле :attribute обязательно для заполнения, когда :values не указано.",
  "validation.required_without_all": "Поле :attribute обязательно для заполнения, когда ни одно из :values не указано.",
  "validation.same": "Значения полей :attribute и :other должны совпадать.",
  "validation.size.array": "Количество элементов в поле :attribute должно быть равным :size.",
  "validation.size.file": "Размер файла, указанный в поле :attribute, должен быть равен :size Кб.",
  "validation.size.numeric": "Значение поля :attribute должно быть равным :size.",
  "validation.size.string": "Количество символов в поле :attribute должно быть равным :size.",
  "validation.starts_with": "Поле :attribute должно начинаться с одного из следующих значений: :values",
  "validation.string": "Значение поля :attribute должно быть строкой.",
  "validation.timezone": "Значение поля :attribute должно быть действительным часовым поясом.",
  "validation.ulid": "Значение поля :attribute должно быть корректным ULID.",
  "validation.unique": "Такое значение поля :attribute уже существует.",
  "validation.uploaded": "Загрузка файла из поля :attribute не удалась.",
  "validation.uppercase": "Значение поля :attribute должно быть в верхнем регистре.",
  "validation.url": "Значение поля :attribute не является ссылкой или имеет некорректный формат.",
  "validation.uuid": "Значение поля :attribute должно быть корректным UUID.",
  "validation.attributes.address": "адрес",
  "validation.attributes.affiliate_url": "Партнёрская ссылка",
  "validation.attributes.age": "возраст",
  "validation.attributes.amount": "количество",
  "validation.attributes.announcement": "анонс",
  "validation.attributes.area": "область",
  "validation.attributes.audience_prize": "приз зрительских симпатий",
  "validation.attributes.audience_winner": "победитель зрительских симпатий",
  "validation.attributes.available": "доступно",
  "validation.attributes.birthday": "дата рождения",
  "validation.attributes.body": "контент",
  "validation.attributes.city": "город",
  "validation.attributes.company": "компания",
  "validation.attributes.compilation": "компиляция",
  "validation.attributes.concept": "концепт",
  "validation.attributes.conditions": "условия",
  "validation.attributes.content": "контент",
  "validation.attributes.contest": "конкурс",
  "validation.attributes.country": "страна",
  "validation.attributes.cover": "обложка",
  "validation.attributes.created_at": "создано в",
  "validation.attributes.creator": "создатель",
  "validation.attributes.currency": "валюта",
  "validation.attributes.current_password": "текущий пароль",
  "validation.attributes.customer": "клиент",
  "validation.attributes.date": "дата",
  "validation.attributes.date_of_birth": "день рождения",
  "validation.attributes.dates": "даты",
  "validation.attributes.day": "день",
  "validation.attributes.deleted_at": "удалено в",
  "validation.attributes.description": "описание",
  "validation.attributes.display_type": "тип отображения",
  "validation.attributes.district": "округ",
  "validation.attributes.duration": "продолжительность",
  "validation.attributes.email": "email адрес",
  "validation.attributes.excerpt": "выдержка",
  "validation.attributes.filter": "фильтр",
  "validation.attributes.finished_at": "завершено в",
  "validation.attributes.first_name": "имя",
  "validation.attributes.gender": "пол",
  "validation.attributes.grand_prize": "главный приз",
  "validation.attributes.group": "группа",
  "validation.attributes.hour": "час",
  "validation.attributes.image": "изображение",
  "validation.attributes.image_desktop": "десктопное изображение",
  "validation.attributes.image_main": "основное изображение",
  "validation.attributes.image_mobile": "мобильное изображение",
  "validation.attributes.images": "изображения",
  "validation.attributes.is_audience_winner": "победитель зрительских симпатий",
  "validation.attributes.is_hidden": "скрыто",
  "validation.attributes.is_subscribed": "подписан",
  "validation.attributes.is_visible": "отображается",
  "validation.attributes.is_winner": "победитель",
  "validation.attributes.items": "элементы",
  "validation.attributes.key": "ключ",
  "validation.attributes.last_name": "фамилия",
  "validation.attributes.lesson": "урок",
  "validation.attributes.line_address_1": "строка адреса 1",
  "validation.attributes.line_address_2": "строка адреса 2",
  "validation.attributes.login": "логин",
  "validation.attributes.message": "сообщение",
  "validation.attributes.middle_name": "отчество",
  "validation.attributes.minute": "минута",
  "validation.attributes.mobile": "моб. номер",
  "validation.attributes.month": "месяц",
  "validation.attributes.name": "имя",
  "validation.attributes.national_code": "национальный код",
  "validation.attributes.number": "номер",
  "validation.attributes.password": "пароль",
  "validation.attributes.password_confirmation": "подтверждение пароля",
  "validation.attributes.phone": "номер телефона",
  "validation.attributes.photo": "фотография",
  "validation.attributes.portfolio": "портфолио",
  "validation.attributes.postal_code": "индекс",
  "validation.attributes.preview": "предпросмотр",
  "validation.attributes.price": "стоимость",
  "validation.attributes.product_id": "ID продукта",
  "validation.attributes.product_uid": "UID продукта",
  "validation.attributes.product_uuid": "UUID продукта",
  "validation.attributes.promo_code": "промокод",
  "validation.attributes.province": "провинция",
  "validation.attributes.quantity": "количество",
  "validation.attributes.reason": "причина",
  "validation.attributes.recaptcha_response_field": "ошибка капчи",
  "validation.attributes.referee": "жюри",
  "validation.attributes.referees": "жюри",
  "validation.attributes.reject_reason": "причина отказа",
  "validation.attributes.remember": "запомнить",
  "validation.attributes.restored_at": "восстановлено в",
  "validation.attributes.result_text_under_image": "текст под изображением",
  "validation.attributes.role": "роль",
  "validation.attributes.rule": "правило",
  "validation.attributes.rules": "правила",
  "validation.attributes.second": "секунда",
  "validation.attributes.sex": "пол",
  "validation.attributes.shipment": "доставка",
  "validation.attributes.short_text": "короткое описание",
  "validation.attributes.size": "размер",
  "validation.attributes.skills": "навыки",
  "validation.attributes.slug": "слаг",
  "validation.attributes.specialization": "специализация",
  "validation.attributes.started_at": "началось в",
  "validation.attributes.state": "штат",
  "validation.attributes.status": "статус",
  "validation.attributes.street": "улица",
  "validation.attributes.student": "студент",
  "validation.attributes.subject": "заголовок",
  "validation.attributes.tag": "тег",
  "validation.attributes.tags": "теги",
  "validation.attributes.teacher": "учитель",
  "validation.attributes.terms": "правила",
  "validation.attributes.test_description": "тестовое описание",
  "validation.attributes.test_locale": "тестовая локализация",
  "validation.attributes.test_name": "тестовое имя",
  "validation.attributes.text": "текст",
  "validation.attributes.time": "время",
  "validation.attributes.title": "наименование",
  "validation.attributes.type": "тип",
  "validation.attributes.updated_at": "обновлено в",
  "validation.attributes.user": "пользователь",
  "validation.attributes.username": "никнейм",
  "validation.attributes.value": "значение",
  "validation.attributes.winner": "победитель",
  "validation.attributes.work": "работа",
  "validation.attributes.year": "год"
};
const __vite_glob_1_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_ru
}, Symbol.toStringTag, { value: "Module" }));
const php_uk = {
  "actions.accept": "прийняти",
  "actions.action": "Дія",
  "actions.actions": "Дії",
  "actions.add": "додати",
  "actions.admin": "адмін",
  "actions.agree": "Погодьтеся",
  "actions.archive": "Архів",
  "actions.assign": "Призначити",
  "actions.associate": "асоційований",
  "actions.attach": "Прикріпіть",
  "actions.browse": "переглядати",
  "actions.cancel": "Скасувати",
  "actions.choose": "Виберіть",
  "actions.choose_file": "Виберіть файл",
  "actions.choose_image": "Виберіть Зображення",
  "actions.click_to_copy": "Натисніть, щоб скопіювати",
  "actions.close": "Закрити",
  "actions.collapse": "Згорнути",
  "actions.collapse_all": "Закрити все",
  "actions.comment": "коментар",
  "actions.confirm": "Підтвердити",
  "actions.connect": "Підключитися",
  "actions.create": "Створити",
  "actions.delete": "Видалити",
  "actions.detach": "Від'єднати",
  "actions.details": "Подробиці",
  "actions.disable": "Вимкнути",
  "actions.discard": "Відкинути",
  "actions.done": "Готово",
  "actions.down": "вниз",
  "actions.duplicate": "дублікат",
  "actions.edit": "Редагувати",
  "actions.enable": "Увімкнути",
  "actions.expand": "Розгорнути",
  "actions.expand_all": "Розгорнути все",
  "actions.explanation": "Пояснення",
  "actions.export": "Експорт",
  "actions.file": "Файл",
  "actions.files": "Файли",
  "actions.go_home": "Іди додому",
  "actions.hide": "Сховати",
  "actions.home": "додому",
  "actions.image": "Зображення",
  "actions.impersonate": "Видавати себе за іншу особу",
  "actions.impersonation": "Уособлення",
  "actions.import": "Імпорт",
  "actions.introduction": "вступ",
  "actions.like": "Люблю",
  "actions.load": "навантаження",
  "actions.localize": "Локалізуйте",
  "actions.log_in": "Увійти",
  "actions.log_out": "Вийти",
  "actions.named.add": "Додайте :name",
  "actions.named.choose": "Виберіть :name",
  "actions.named.create": "Створити :name",
  "actions.named.delete": "Видалити :name",
  "actions.named.duplicate": "Дублікат: ім'я",
  "actions.named.edit": "Редагувати :name",
  "actions.named.export": "Export :name",
  "actions.named.hide": "Сховати :name",
  "actions.named.import": "Імпорт :name",
  "actions.named.new": "Новий :name",
  "actions.named.restore": "Відновити :name",
  "actions.named.save": "Зберегти :name",
  "actions.named.search": "Пошук :name",
  "actions.named.show": "Показати :name",
  "actions.named.update": "Оновлення :name",
  "actions.named.view": "Переглянути :name",
  "actions.new": "новий",
  "actions.no": "Немає",
  "actions.open": "ВІДЧИНЕНО",
  "actions.open_website": "Відкрити на сайті",
  "actions.preview": "Попередній перегляд",
  "actions.price": "Ціна",
  "actions.record": "запис",
  "actions.restore": "Відновлення",
  "actions.save": "зберегти",
  "actions.save_and_close": "Зберегти та закрити",
  "actions.save_and_return": "Зберегти та повернути",
  "actions.search": "Пошук",
  "actions.select": "Виберіть",
  "actions.select_all": "Вибрати все",
  "actions.send": "Надіслати",
  "actions.settings": "Налаштування",
  "actions.show": "Показати",
  "actions.show_all": "Покажи все",
  "actions.sign_in": "Увійти",
  "actions.solve": "Розв'язати",
  "actions.start": "Почніть",
  "actions.stop": "СТІЙ",
  "actions.submit": "Надіслати",
  "actions.subscribe": "Підпишіться",
  "actions.switch": "Перемикач",
  "actions.switch_to_role": "Перейти на роль",
  "actions.tag": "Тег",
  "actions.tags": "Теги",
  "actions.target_link.blank": "Відкрити в новому вікні",
  "actions.target_link.parent": "Відкрити в батьківському фреймі",
  "actions.target_link.self": "Відкрити в поточному вікні",
  "actions.target_link.top": "Відкрити в самому верхньому кадрі",
  "actions.translate": "Перекласти",
  "actions.translate_it": "Переклади це",
  "actions.unpack": "Розпакуйте",
  "actions.unsubscribe": "Відписатися",
  "actions.up": "вгору",
  "actions.update": "оновлення",
  "actions.user": "Користувач",
  "actions.view": "Переглянути",
  "actions.yes": "Так",
  "auth.failed": "Вказані облікові дані не збігаються з нашими записами.",
  "auth.password": "Пароль невірний.",
  "auth.throttle": "Забагато спроб входу. Будь ласка, спробуйте ще раз, через :seconds секунд.",
  "http-statuses.0": "Невідома помилка",
  "http-statuses.100": "Продовжити",
  "http-statuses.101": "Перемикання протоколів",
  "http-statuses.102": "Йде обробка",
  "http-statuses.200": "добре",
  "http-statuses.201": "Створено",
  "http-statuses.202": "Прийнято",
  "http-statuses.203": "Інформація не авторитетна",
  "http-statuses.204": "Немає вмісту",
  "http-statuses.205": "Скинути вміст",
  "http-statuses.206": "Частковий вміст",
  "http-statuses.207": "Мультистатус",
  "http-statuses.208": "Вже повідомлено",
  "http-statuses.226": "Використано IM",
  "http-statuses.300": "Кілька варіантів",
  "http-statuses.301": "Переміщено назавжди",
  "http-statuses.302": "Знайдено",
  "http-statuses.303": "Дивіться інше",
  "http-statuses.304": "Не змінено",
  "http-statuses.305": "Використовуйте проксі",
  "http-statuses.307": "Тимчасове перенаправлення",
  "http-statuses.308": "Постійне перенаправлення",
  "http-statuses.400": "Поганий запит",
  "http-statuses.401": "Несанкціоновано",
  "http-statuses.402": "Потрібна оплата",
  "http-statuses.403": "Заборонено",
  "http-statuses.404": "Ресурс не знайдено",
  "http-statuses.405": "Метод заборонений",
  "http-statuses.406": "Не прийнятний",
  "http-statuses.407": "Потрібна автентифікація проксі",
  "http-statuses.408": "Сплинув час очікування",
  "http-statuses.409": "Конфлікт",
  "http-statuses.410": "Видалено",
  "http-statuses.411": "Необхідна довжина",
  "http-statuses.412": "Хибна умова",
  "http-statuses.413": "Корисне навантаження занадто велике",
  "http-statuses.414": "URI занадто довгий",
  "http-statuses.415": "Непідтримуваний тип даних",
  "http-statuses.416": "Діапазон недосяжний",
  "http-statuses.417": "Очікування не виконано",
  "http-statuses.418": "Я чайник",
  "http-statuses.419": "Сеанс закінчився",
  "http-statuses.421": "Неправильний запит",
  "http-statuses.422": "Сутність, що не підлягає обробці",
  "http-statuses.423": "Заблоковано",
  "http-statuses.424": "Помилка залежності",
  "http-statuses.425": "Зарано",
  "http-statuses.426": "Потрібне оновлення",
  "http-statuses.428": "Необхідна передумова",
  "http-statuses.429": "Забагато запитів",
  "http-statuses.431": "Завеликі поля заголовка запиту",
  "http-statuses.444": "З'єднання закрито без відповіді",
  "http-statuses.449": "Повторити з",
  "http-statuses.451": "Недоступний з юридичних причин",
  "http-statuses.499": "Клієнт закритий запит",
  "http-statuses.500": "Внутрішня помилка сервера",
  "http-statuses.501": "Не впроваджений",
  "http-statuses.502": "Невірний шлюз",
  "http-statuses.503": "Режим обслуговування",
  "http-statuses.504": "Шлюз не відповідає",
  "http-statuses.505": "Версія HTTP не підтримується",
  "http-statuses.506": "Варіант також веде переговори",
  "http-statuses.507": "Недостатньо місця",
  "http-statuses.508": "Виявлено цикл",
  "http-statuses.509": "Перевищено обмеження пропускної здатності",
  "http-statuses.510": "Не розширено",
  "http-statuses.511": "Потрібна мережева автентифікація",
  "http-statuses.520": "Невідома помилка",
  "http-statuses.521": "Веб-сервер не працює",
  "http-statuses.522": "Сплив час підключення",
  "http-statuses.523": "Джерело недоступне",
  "http-statuses.524": "Виник тайм-аут",
  "http-statuses.525": "Помилка рукостискання SSL",
  "http-statuses.526": "Недійсний сертифікат SSL",
  "http-statuses.527": "Помилка Railgun",
  "http-statuses.598": "Сплив час читання мережі",
  "http-statuses.599": "Сплив час підключення до мережі",
  "http-statuses.unknownError": "Невідома помилка",
  "pagination.next": "Далі &raquo;",
  "pagination.previous": "&laquo; Назад",
  "passwords.reset": "Ваш пароль змінено!",
  "passwords.sent": "Ми надіслали на Вашу електронну адресу посилання для зміни пароля!",
  "passwords.throttled": "Зачекайте, перш ніж повторити спробу.",
  "passwords.token": "Термін дії посилання для зміни пароля закінчився.",
  "passwords.user": "Користувача із вказаною електронною адресою не знайдено.",
  "validation.accepted": "Ви повинні прийняти :attribute.",
  "validation.accepted_if": "Поле :attribute має бути прийнятним, коли :other є :value.",
  "validation.active_url": "Поле :attribute не є правильним URL.",
  "validation.after": "Поле :attribute має містити дату не раніше :date.",
  "validation.after_or_equal": "Поле :attribute має містити дату не раніше, або дорівнюватися :date.",
  "validation.alpha": "Поле :attribute має містити лише літери.",
  "validation.alpha_dash": "Поле :attribute має містити лише літери, цифри, тире та підкреслення.",
  "validation.alpha_num": "Поле :attribute має містити лише літери та цифри.",
  "validation.any_of": "Поле :attribute є недійсним.",
  "validation.array": "Поле :attribute має бути масивом.",
  "validation.ascii": "Поле :attribute має містити лише однобайтові буквено-цифрові знаки та символи.",
  "validation.attributes.address": "адреса",
  "validation.attributes.affiliate_url": "афілійована URL-адреса",
  "validation.attributes.age": "вік",
  "validation.attributes.amount": "сума",
  "validation.attributes.announcement": "оголошення",
  "validation.attributes.area": "область",
  "validation.attributes.audience_prize": "приз глядацьких симпатій",
  "validation.attributes.audience_winner": "audience winner",
  "validation.attributes.available": "доступно",
  "validation.attributes.birthday": "день народження",
  "validation.attributes.body": "тіло",
  "validation.attributes.city": "місто",
  "validation.attributes.company": "company",
  "validation.attributes.compilation": "компіляція",
  "validation.attributes.concept": "концепція",
  "validation.attributes.conditions": "умови",
  "validation.attributes.content": "контент",
  "validation.attributes.contest": "contest",
  "validation.attributes.country": "країна",
  "validation.attributes.cover": "обкладинка",
  "validation.attributes.created_at": "створено о",
  "validation.attributes.creator": "творець",
  "validation.attributes.currency": "валюта",
  "validation.attributes.current_password": "поточний пароль",
  "validation.attributes.customer": "клієнт",
  "validation.attributes.date": "дата",
  "validation.attributes.date_of_birth": "дата народження",
  "validation.attributes.dates": "дати",
  "validation.attributes.day": "день",
  "validation.attributes.deleted_at": "видалено о",
  "validation.attributes.description": "опис",
  "validation.attributes.display_type": "тип відображення",
  "validation.attributes.district": "район",
  "validation.attributes.duration": "тривалість",
  "validation.attributes.email": "e-mail",
  "validation.attributes.excerpt": "уривок",
  "validation.attributes.filter": "фільтр",
  "validation.attributes.finished_at": "закінчив о",
  "validation.attributes.first_name": "ім'я",
  "validation.attributes.gender": "стать",
  "validation.attributes.grand_prize": "великий приз",
  "validation.attributes.group": "група",
  "validation.attributes.hour": "година",
  "validation.attributes.image": "зображення",
  "validation.attributes.image_desktop": "зображення робочого столу",
  "validation.attributes.image_main": "головне зображення",
  "validation.attributes.image_mobile": "мобільне зображення",
  "validation.attributes.images": "зображення",
  "validation.attributes.is_audience_winner": "є переможцем глядацьких симпатій",
  "validation.attributes.is_hidden": "приховано",
  "validation.attributes.is_subscribed": "підписаний",
  "validation.attributes.is_visible": "видимий",
  "validation.attributes.is_winner": "є переможцем",
  "validation.attributes.items": "елементи",
  "validation.attributes.key": "ключ",
  "validation.attributes.last_name": "прізвище",
  "validation.attributes.lesson": "урок",
  "validation.attributes.line_address_1": "адреса рядка 1",
  "validation.attributes.line_address_2": "адреса рядка 2",
  "validation.attributes.login": "логін",
  "validation.attributes.message": "повідомлення",
  "validation.attributes.middle_name": "по батькові",
  "validation.attributes.minute": "хвилина",
  "validation.attributes.mobile": "моб. номер",
  "validation.attributes.month": "місяць",
  "validation.attributes.name": "ім'я",
  "validation.attributes.national_code": "національний код",
  "validation.attributes.number": "номер",
  "validation.attributes.password": "пароль",
  "validation.attributes.password_confirmation": "підтвердження пароля",
  "validation.attributes.phone": "телефон",
  "validation.attributes.photo": "фото",
  "validation.attributes.portfolio": "портфоліо",
  "validation.attributes.postal_code": "поштовий індекс",
  "validation.attributes.preview": "попередній перегляд",
  "validation.attributes.price": "ціна",
  "validation.attributes.product_id": "ID товару",
  "validation.attributes.product_uid": "UID товару",
  "validation.attributes.product_uuid": "UUID товару",
  "validation.attributes.promo_code": "промокод",
  "validation.attributes.province": "провінція",
  "validation.attributes.quantity": "кількість",
  "validation.attributes.reason": "причина",
  "validation.attributes.recaptcha_response_field": "поле відповіді recaptcha",
  "validation.attributes.referee": "арбітр",
  "validation.attributes.referees": "арбітри",
  "validation.attributes.reject_reason": "причина відмови",
  "validation.attributes.remember": "запам'ятати",
  "validation.attributes.restored_at": "відновлено о",
  "validation.attributes.result_text_under_image": "текст результату під зображенням",
  "validation.attributes.role": "роль",
  "validation.attributes.rule": "правило",
  "validation.attributes.rules": "правила",
  "validation.attributes.second": "секунда",
  "validation.attributes.sex": "стать",
  "validation.attributes.shipment": "доставка",
  "validation.attributes.short_text": "короткий текст",
  "validation.attributes.size": "розмір",
  "validation.attributes.skills": "навички",
  "validation.attributes.slug": "URL-адрес",
  "validation.attributes.specialization": "спеціалізація",
  "validation.attributes.started_at": "розпочато о",
  "validation.attributes.state": "стан",
  "validation.attributes.status": "статус",
  "validation.attributes.street": "вулиця",
  "validation.attributes.student": "студент",
  "validation.attributes.subject": "тема",
  "validation.attributes.tag": "тег",
  "validation.attributes.tags": "теги",
  "validation.attributes.teacher": "викладач",
  "validation.attributes.terms": "умови",
  "validation.attributes.test_description": "опис тесту",
  "validation.attributes.test_locale": "тестова локаль",
  "validation.attributes.test_name": "назва тесту",
  "validation.attributes.text": "текст",
  "validation.attributes.time": "час",
  "validation.attributes.title": "назва",
  "validation.attributes.type": "типу",
  "validation.attributes.updated_at": "оновлено о",
  "validation.attributes.user": "користувач",
  "validation.attributes.username": "нікнейм",
  "validation.attributes.value": "значення",
  "validation.attributes.winner": "winner",
  "validation.attributes.work": "work",
  "validation.attributes.year": "рік",
  "validation.before": "Поле :attribute має містити дату не пізніше :date.",
  "validation.before_or_equal": "Поле :attribute має містити дату не пізніше, або дорівнюватися :date.",
  "validation.between.array": "Поле :attribute має містити від :min до :max елементів.",
  "validation.between.file": "Розмір файлу у полі :attribute має бути не менше :min та не більше :max кілобайт.",
  "validation.between.numeric": "Поле :attribute має бути між :min та :max.",
  "validation.between.string": "Текст у полі :attribute має бути не менше :min та не більше :max символів.",
  "validation.boolean": "Поле :attribute повинне містити логічний тип.",
  "validation.can": "Поле :attribute містить неавторизоване значення.",
  "validation.confirmed": "Поле :attribute не збігається з підтвердженням.",
  "validation.contains": "Поле :attribute має містити обов'язкове значення.",
  "validation.current_password": "Пароль неправильний.",
  "validation.date": "Поле :attribute не є датою.",
  "validation.date_equals": "Поле :attribute має бути датою рівною :date.",
  "validation.date_format": "Поле :attribute не відповідає формату :format.",
  "validation.decimal": "Поле :attribute має містити :decimal десяткових знаків.",
  "validation.declined": "Поле :attribute має бути відхилено.",
  "validation.declined_if": "Поле :attribute має бути відхилено, якщо :other є :value.",
  "validation.different": "Поля :attribute та :other повинні бути різними.",
  "validation.digits": "Довжина цифрового поля :attribute повинна дорівнювати :digits.",
  "validation.digits_between": "Довжина цифрового поля :attribute повинна бути від :min до :max.",
  "validation.dimensions": "Поле :attribute містить неприпустимі розміри зображення.",
  "validation.distinct": "Поле :attribute містить значення, яке дублюється.",
  "validation.doesnt_contain": "Поле :attribute не повинно містити жодного з наведеного: :values.",
  "validation.doesnt_end_with": "Поле :attribute не може закінчуватися одним із таких: :values.",
  "validation.doesnt_start_with": "Поле :attribute не може починатися з одного з наступного: :values.",
  "validation.email": "Поле :attribute повинне містити коректну електронну адресу.",
  "validation.ends_with": "Поле :attribute має закінчуватися одним з наступних значень: :values",
  "validation.enum": "Значення поля :attribute відсутнє у списку допустимих значень.",
  "validation.exists": "Значення поля :attribute не існує.",
  "validation.extensions": "Файл у полі :attribute повинен мати одне з наступних розширень: :values.",
  "validation.file": "Поле :attribute має містити файл.",
  "validation.filled": "Поле :attribute є обов'язковим для заповнення.",
  "validation.gt.array": "Поле :attribute має містити більше ніж :value елементів.",
  "validation.gt.file": "Поле :attribute має бути більше ніж :value кілобайт.",
  "validation.gt.numeric": "Поле :attribute має бути більше ніж :value.",
  "validation.gt.string": "Поле :attribute має бути більше ніж :value символів.",
  "validation.gte.array": "Поле :attribute має містити :value чи більше елементів.",
  "validation.gte.file": "Поле :attribute має дорівнювати чи бути більше ніж :value кілобайт.",
  "validation.gte.numeric": "Поле :attribute має дорівнювати чи бути більше ніж :value.",
  "validation.gte.string": "Поле :attribute має дорівнювати чи бути більше ніж :value символів.",
  "validation.hex_color": "Поле :attribute має мати дійсний шістнадцятковий колір.",
  "validation.image": "Поле :attribute має містити зображення.",
  "validation.in": "Значення поля :attribute відсутнє у списку допустимих значень.",
  "validation.in_array": "Значення поля :attribute не міститься в :other.",
  "validation.in_array_keys": "Поле :attribute має містити принаймні один із таких ключів: :values.",
  "validation.integer": "Поле :attribute має містити ціле число.",
  "validation.ip": "Поле :attribute має містити IP адресу.",
  "validation.ipv4": "Поле :attribute має містити IPv4 адресу.",
  "validation.ipv6": "Поле :attribute має містити IPv6 адресу.",
  "validation.json": "Дані поля :attribute мають бути у форматі JSON.",
  "validation.list": "Значення поля :attribute має бути списком.",
  "validation.lowercase": "Поле :attribute має бути рядком у нижньому регістрі",
  "validation.lt.array": "Поле :attribute має містити менше ніж :value елементів.",
  "validation.lt.file": "Поле :attribute має бути менше ніж :value кілобайт.",
  "validation.lt.numeric": "Поле :attribute має бути менше ніж :value.",
  "validation.lt.string": "Поле :attribute має бути менше ніж :value символів.",
  "validation.lte.array": "Поле :attribute має містити не більше ніж :value елементів.",
  "validation.lte.file": "Поле :attribute має дорівнювати чи бути менше ніж :value кілобайт.",
  "validation.lte.numeric": "Поле :attribute має дорівнювати чи бути менше ніж :value.",
  "validation.lte.string": "Поле :attribute має дорівнювати чи бути менше ніж :value символів.",
  "validation.mac_address": "Поле :attribute має містити MAC адресу.",
  "validation.max.array": "Поле :attribute повинне містити не більше :max елементів.",
  "validation.max.file": "Файл в полі :attribute має бути не більше :max кілобайт.",
  "validation.max.numeric": "Поле :attribute має бути не більше :max.",
  "validation.max.string": "Текст в полі :attribute повинен мати довжину не більшу за :max.",
  "validation.max_digits": "Поле :attribute не може містити більше :max цифр.",
  "validation.mimes": "Поле :attribute повинне містити файл одного з типів: :values.",
  "validation.mimetypes": "Поле :attribute повинне містити файл одного з типів: :values.",
  "validation.min.array": "Поле :attribute повинне містити не менше :min елементів.",
  "validation.min.file": "Розмір файлу у полі :attribute має бути не меншим :min кілобайт.",
  "validation.min.numeric": "Поле :attribute повинне бути не менше :min.",
  "validation.min.string": "Текст у полі :attribute повинен містити не менше :min символів.",
  "validation.min_digits": "Поле :attribute має містити принаймні :min цифр.",
  "validation.missing": "Поле :attribute має бути відсутнім.",
  "validation.missing_if": "Поле :attribute має бути відсутнім, якщо :other дорівнює :value.",
  "validation.missing_unless": "Поле :attribute має бути відсутнім, якщо :other не є :value.",
  "validation.missing_with": "Поле :attribute повинно бути відсутнім, якщо присутнє :values.",
  "validation.missing_with_all": "Поле :attribute повинно бути відсутнім, якщо присутні :values.",
  "validation.multiple_of": "Поле :attribute повинно бути кратним :value",
  "validation.not_in": "Значення поля :attribute не повинно бути у списку.",
  "validation.not_regex": "Формат поля :attribute не вірний.",
  "validation.numeric": "Поле :attribute повинно містити число.",
  "validation.password.letters": "Поле :attribute має містити принаймні одну літеру.",
  "validation.password.mixed": "Поле :attribute має містити принаймні одну велику та одну малу літери.",
  "validation.password.numbers": "Поле :attribute має містити принаймні одне число.",
  "validation.password.symbols": "Поле :attribute має містити принаймні один символ.",
  "validation.password.uncompromised": "Поле :attribute з'явився під час витоку даних. Виберіть інший :attribute.",
  "validation.present": "Поле :attribute повинне бути присутнє.",
  "validation.present_if": "Поле :attribute має бути присутнім, коли :other дорівнює :value.",
  "validation.present_unless": "Поле :attribute повинно бути присутнім, якщо :other не є :value.",
  "validation.present_with": "Поле :attribute повинно бути присутнім, коли присутній :values.",
  "validation.present_with_all": "Поле :attribute повинно бути присутнім, якщо присутні :values.",
  "validation.prohibited": "Поле :attribute заборонено.",
  "validation.prohibited_if": "Поле :attribute заборонено, коли :other дорівнює :value.",
  "validation.prohibited_if_accepted": "Поле :attribute заборонено, якщо :other прийнято.",
  "validation.prohibited_if_declined": "Поле :attribute заборонено, якщо :other відхилено.",
  "validation.prohibited_unless": "Поле :attribute заборонено, якщо тільки :other не знаходиться в :values.",
  "validation.prohibits": "Поле :attribute забороняє присутність :other.",
  "validation.regex": "Поле :attribute має хибний формат.",
  "validation.required": "Поле :attribute є обов'язковим для заповнення.",
  "validation.required_array_keys": "Поле :attribute має містити записи для: :values.",
  "validation.required_if": "Поле :attribute є обов'язковим для заповнення, коли :other є рівним :value.",
  "validation.required_if_accepted": "Поле :attribute є обов'язковим, якщо прийнято :other.",
  "validation.required_if_declined": "Поле :attribute є обов'язковим, якщо відхилено :other.",
  "validation.required_unless": "Поле :attribute є обов'язковим для заповнення, коли :other відрізняється від :values",
  "validation.required_with": "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  "validation.required_with_all": "Поле :attribute є обов'язковим для заповнення, коли :values вказано.",
  "validation.required_without": "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  "validation.required_without_all": "Поле :attribute є обов'язковим для заповнення, коли :values не вказано.",
  "validation.same": "Поля :attribute та :other мають збігатися.",
  "validation.size.array": "Поле :attribute повинне містити :size елементів.",
  "validation.size.file": "Файл у полі :attribute має бути розміром :size кілобайт.",
  "validation.size.numeric": "Поле :attribute має бути довжини :size.",
  "validation.size.string": "Текст у полі :attribute повинен містити :size символів.",
  "validation.starts_with": "Поле :attribute повинне починатися з одного з наступних значень: :values",
  "validation.string": "Поле :attribute повинне містити текст.",
  "validation.timezone": "Поле :attribute повинне містити коректну часову зону.",
  "validation.ulid": "Поле :attribute має бути коректним ULID.",
  "validation.unique": "Вказане значення поля :attribute вже існує.",
  "validation.uploaded": "Завантаження :attribute не вдалося.",
  "validation.uppercase": "Поле :attribute має бути рядком у верхньому регістрі.",
  "validation.url": "Формат поля :attribute хибний.",
  "validation.uuid": "Поле :attribute має бути коректним UUID ідентифікатором."
};
const __vite_glob_1_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_uk
}, Symbol.toStringTag, { value: "Module" }));
const Accept$2 = "Akceptuj";
const Accepted$2 = "Zaakceptowano";
const Action$2 = "Działanie";
const Actions$2 = "Działania";
const Active$1 = "Active";
const Add$2 = "Dodaj";
const Admin$2 = "Administrator";
const Agree$2 = "Zgadzam się";
const Alias$1 = "Alias";
const Apply$1 = "Apply";
const Archive$2 = "Archiwizuj";
const Assign$2 = "Przydziel";
const Associate$2 = "Współpracownik";
const Attach$2 = "Dołącz";
const Back$1 = "Back";
const Birthday$1 = "Birthday";
const Bonuses$1 = "Bonuses";
const Browse$2 = "Przeglądaj";
const Buy$1 = "Buy";
const Cancel$2 = "Anuluj";
const Catalog$1 = "Catalog";
const Categories$1 = "Categories";
const Category$1 = "Category";
const Checkout$1 = "Checkout";
const Choose$2 = "Wybierz";
const City$1 = "City";
const Close$2 = "Zamknij";
const Code$1 = "Code";
const Collapse$2 = "Zwiń";
const Comment$2 = "Skomentuj";
const Commerce$1 = "Commerce";
const Configuration$1 = "Configuration";
const Confirm$2 = "Potwierdź";
const Conflict$2 = "Konflikt";
const Connect$2 = "Połącz";
const Contacts$1 = "Contacts";
const Continue$2 = "Kontynuuj";
const Country$1 = "Country";
const Create$2 = "Utwórz";
const Created$2 = "Utworzono";
const Dashboard$2 = "Panel";
const Delete$2 = "Usuń";
const Detach$2 = "Odłącz";
const Details$2 = "Szczegóły";
const Disable$2 = "Wyłącz";
const Disabled$1 = "Disabled";
const Discard$2 = "Odrzuć";
const Done$2 = "Gotowe";
const Down$2 = "W dół";
const Draft$1 = "Draft";
const Duplicate$2 = "Duplikuj";
const Edit$2 = "Edytuj";
const Email$2 = "E-mail";
const Enable$2 = "Włącz";
const Expand$2 = "Rozwiń";
const Explanation$2 = "Wyjaśnienie";
const Export$2 = "Eksportuj";
const Fee$1 = "Fee";
const File$2 = "Plik";
const Files$2 = "Pliki";
const Finish$1 = "Finish";
const Forbidden$2 = "Zabronione";
const Found$2 = "Znaleziono";
const Free$1 = "Free";
const Gender$1 = "Gender";
const General$1 = "General";
const Gone$2 = "Zasób został usunięty lub przeniesiony";
const Hide$2 = "Ukryj";
const Home$2 = "Strona główna";
const ID$1 = "ID";
const Image$2 = "Obraz";
const Impersonate$2 = "Podszywaj się pod";
const Impersonation$2 = "Podszywanie się";
const Import$2 = "Importuj";
const Introduction$2 = "Wprowadzenie";
const Items$1 = "Items";
const Language$1 = "Language";
const LastName$1 = "LastName";
const Like$2 = "Lubię";
const Load$2 = "Załaduj";
const Localize$2 = "Zlokalizuj";
const Location$2 = "Lokalizacja";
const Locked$2 = "Zablokowany";
const Login$2 = "Logowanie";
const Logo$1 = "Logo";
const Logout$2 = "Wyloguj";
const Manufacturer$1 = "Manufacturer";
const Manufacturers$1 = "Manufacturers";
const Media$1 = "Media";
const Messages$1 = "Messages";
const Name$2 = "Imię i nazwisko";
const New$2 = "Nowe";
const No$2 = "Nie";
const OK$2 = "OK";
const Open$2 = "Otwórz";
const Order$1 = "Order";
const Orders$1 = "Orders";
const Pages$1 = "Pages";
const Parent$1 = "Parent";
const Password$2 = "Hasło";
const Payment$1 = "Payment";
const Petrenko$1 = "Petrenko";
const Petro$1 = "Petro";
const Petrovych$1 = "Petrovych";
const Phone$1 = "Phone";
const Preview$2 = "Podgląd";
const Price$2 = "Cena";
const Processing$2 = "Przetwarzanie";
const Profile$2 = "Profil";
const Quantity$1 = "Quantity";
const Record$2 = "Nagrywać";
const Register$2 = "Zarejestruj się";
const Remove$1 = "Remove";
const Restore$2 = "Przywróć";
const Save$2 = "Zapisz";
const Search$2 = "Szukaj";
const Select$2 = "Wybierz";
const Send$2 = "Wyślij";
const Settings$2 = "Ustawienia";
const Shipping$1 = "Shipping";
const Shippings$1 = "Shippings";
const Show$2 = "Pokaż";
const Showing$2 = "Wyświetlanie";
const Solve$2 = "Rozwiąż";
const Start$2 = "Początek";
const Status$1 = "Status";
const Stop$2 = "Zatrzymywać się";
const Submit$2 = "Zatwierdź";
const Subscribe$2 = "Subskrybuj";
const Subtotal$1 = "Subtotal";
const Summary$1 = "Summary";
const Switch$2 = "Przełącz";
const System$1 = "System";
const Tag$2 = "Tag";
const Tags$2 = "Tagi";
const Title$1 = "Title";
const Total$1 = "Total";
const Translate$2 = "Przetłumacz";
const Translations$1 = "Translations";
const Unauthorized$2 = "Nieautoryzowany Dostęp";
const Unpack$2 = "Rozpakuj";
const Unsubscribe$2 = "Wypisz się";
const Up$2 = "W górę";
const Update$2 = "Aktualizacja";
const User$2 = "Użytkownik";
const Users$1 = "Users";
const Version$1 = "Version";
const Versions$1 = "Versions";
const View$2 = "Widok";
const Warehouse$1 = "Warehouse";
const Warehouses$1 = "Warehouses";
const Yes$2 = "Tak";
const ava$1 = "ava";
const email$2 = "Pole :attribute nie jest poprawnym adresem e-mail.";
const errors$2 = "błędy";
const female$1 = "female";
const inStoke$1 = "inStoke";
const male$1 = "male";
const name$2 = "imię i nazwisko";
const of$2 = "z";
const other$1 = "other";
const password$2 = "Hasło jest nieprawidłowe.";
const results$2 = "wyników";
const tasks$1 = "tasks";
const to$3 = "do";
const pl = {
  "#ID": "#ID",
  "(and :count more error)": "(i jeszcze :count błąd)",
  "(and :count more errors)": "(i jeszcze :count błąd)|(i jeszcze :count błędy)|(i jeszcze :count błędów)",
  "A Timeout Occurred": "Wystąpił limit czasu",
  "A decryption key is required.": "Wymagany jest klucz deszyfrujący.",
  "A new verification link has been sent to the email address you provided during registration.": "Nowy link weryfikacyjny został wysłany na adres e-mail podany podczas rejestracji.",
  "A new verification link has been sent to your email address.": "Nowy link weryfikacyjny został wysłany na Twój adres e-mail.",
  "About you": "About you",
  Accept: Accept$2,
  Accepted: Accepted$2,
  Action: Action$2,
  Actions: Actions$2,
  Active: Active$1,
  Add: Add$2,
  "Add :name": "Dodaj :name",
  "Add Method": "Add Method",
  "Add some fertilizers to start your order": "Add some fertilizers to start your order",
  Admin: Admin$2,
  Agree: Agree$2,
  Alias: Alias$1,
  "All rights reserved": "All rights reserved",
  "All rights reserved.": "Wszelkie prawa zastrzeżone.",
  "Already Reported": "Już zgłoszone",
  "Already registered?": "Już zarejestrowany?",
  "Another recipient": "Another recipient",
  Apply: Apply$1,
  Archive: Archive$2,
  "Are you sure you want to delete this element?": "Are you sure you want to delete this element?",
  "Are you sure you want to delete this payment method?": "Are you sure you want to delete this payment method?",
  "Are you sure you want to delete this?": "Are you sure you want to delete this?",
  "Are you sure you want to delete your account?": "Czy na pewno chcesz usunąć swoje konto?",
  Assign: Assign$2,
  Associate: Associate$2,
  Attach: Attach$2,
  "Available bonuses": "Available bonuses",
  Back: Back$1,
  "Bad Gateway": "Zła brama",
  "Bad Request": "Nieprawidłowe żądanie",
  "Bandwidth Limit Exceeded": "Przekroczono limit transferu danych",
  Birthday: Birthday$1,
  "Bonus Balance": "Bonus Balance",
  Bonuses: Bonuses$1,
  Browse: Browse$2,
  Buy: Buy$1,
  Cancel: Cancel$2,
  "Cart is empty": "Cart is empty",
  Catalog: Catalog$1,
  Categories: Categories$1,
  Category: Category$1,
  Checkout: Checkout$1,
  Choose: Choose$2,
  "Choose :name": "Wybierz :name",
  "Choose File": "Wybierz Plik",
  "Choose Image": "Wybierz obraz",
  City: City$1,
  "Click here to re-send the verification email.": "Kliknij tutaj, aby ponownie wysłać e-mail weryfikacyjny.",
  "Click to copy": "Kliknij, aby skopiować",
  "Click to upload": "Click to upload",
  "Client Closed Request": "Zamknięte żądanie klienta",
  Close: Close$2,
  Code: Code$1,
  Collapse: Collapse$2,
  "Collapse All": "Zwiń wszystko",
  Comment: Comment$2,
  Commerce: Commerce$1,
  "Commission Percent (%)": "Commission Percent (%)",
  Configuration: Configuration$1,
  Confirm: Confirm$2,
  "Confirm Order": "Confirm Order",
  "Confirm Password": "Potwierdź Hasło",
  Conflict: Conflict$2,
  Connect: Connect$2,
  "Connection Closed Without Response": "Połączenie zamknięte bez odpowiedzi",
  "Connection Timed Out": "Przekroczono limit czasu połączenia",
  "Contact Information": "Contact Information",
  Contacts: Contacts$1,
  Continue: Continue$2,
  "Continue Shopping": "Continue Shopping",
  Country: Country$1,
  Create: Create$2,
  "Create :name": "Utwórz :name",
  "Create Payment Method": "Create Payment Method",
  Created: Created$2,
  "Current Password": "Aktualne Hasło",
  Dashboard: Dashboard$2,
  "Date": "Date",
  Delete: Delete$2,
  "Delete :name": "Usuń :name",
  "Delete Account": "Usuń Konto",
  "Department №1, str. Main...": "Department №1, str. Main...",
  Detach: Detach$2,
  Details: Details$2,
  Disable: Disable$2,
  Disabled: Disabled$1,
  Discard: Discard$2,
  "Display Order": "Display Order",
  Done: Done$2,
  Down: Down$2,
  Draft: Draft$1,
  Duplicate: Duplicate$2,
  "Duplicate :name": "Duplikuj :name",
  Edit: Edit$2,
  "Edit :name": "Edytuj :name",
  "Edit Profile": "Edit Profile",
  Email: Email$2,
  "Email Password Reset Link": "Wyślij Link Resetowania Hasła",
  "Email складу": "Email складу",
  Enable: Enable$2,
  "Encrypted environment file already exists.": "Zaszyfrowany plik konfiguracji środowiska już istnieje.",
  "Encrypted environment file not found.": "Nie znaleziono zaszyfrowanego pliku konfiguracji środowiska.",
  "Ensure your account is using a long, random password to stay secure.": "Upewnij się, że Twoje konto używa długiego, losowego hasła, aby zachować bezpieczeństwo.",
  "Enter your last name": "Enter your last name",
  "Enter your name": "Enter your name",
  "Environment file already exists.": "Plik konfiguracji środowiska już istnieje.",
  "Environment file not found.": "Nie znaleziono pliku konfiguracji środowiska.",
  Expand: Expand$2,
  "Expand All": "Rozwiń wszystko",
  "Expectation Failed": "Oczekiwanie nie powiodło się",
  Explanation: Explanation$2,
  Export: Export$2,
  "Export :name": "Export :name",
  "Failed Dependency": "Nieudana zależność",
  Fee: Fee$1,
  File: File$2,
  Files: Files$2,
  "Fill in your details or login": "Fill in your details or login",
  Finish: Finish$1,
  "First Name": "First Name",
  "Fixed Fee (Amount)": "Fixed Fee (Amount)",
  Forbidden: Forbidden$2,
  "Forgot your password?": "Nie pamiętasz hasła?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Nie pamiętasz hasła? Nie ma problemu. Podaj nam swój adres e-mail, a wyślemy Ci link do zresetowania hasła, który pozwoli Ci wprowadzić nowe.",
  Found: Found$2,
  Free: Free$1,
  "Full Name": "Full Name",
  "Gateway Timeout": "Przekroczenie limitu czasu bramy",
  Gender: Gender$1,
  General: General$1,
  "General Data": "General Data",
  "Go Home": "Przejdź do strony głównej",
  "Go to Checkout": "Go to Checkout",
  "Go to page :page": "Przejdź do strony :page",
  Gone: Gone$2,
  "HTTP Version Not Supported": "Wersja HTTP nie jest obsługiwana",
  "Have an account?": "Have an account?",
  "Hello!": "Cześć!",
  Hide: Hide$2,
  "Hide :name": "Ukryj :name",
  Home: Home$2,
  "I'm a teapot": "Jestem czajnikiem",
  ID: ID$1,
  "IM Used": "Użyto zasobów IM",
  "If you did not create an account, no further action is required.": "Jeśli nie stworzyłeś konta, zignoruj tę wiadomość.",
  "If you did not request a password reset, no further action is required.": "Jeśli nie chcesz resetować hasła, zignoruj tę wiadomość.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Jeżeli masz problemy z kliknięciem przycisku ":actionText", skopiuj i wklej poniższy adres do pasku przeglądarki:',
  Image: Image$2,
  Impersonate: Impersonate$2,
  Impersonation: Impersonation$2,
  Import: Import$2,
  "Import :name": "Importuj :name",
  "In Cart": "In Cart",
  "In Progress": "In Progress",
  "Insufficient Storage": "Niewystarczające miejsce do przechowywania",
  "Internal Server Error": "Wewnętrzny błąd serwera",
  Introduction: Introduction$2,
  "Invalid JSON was returned from the route.": "Routing zwrócił nieprawidłowy kod JSON.",
  "Invalid SSL Certificate": "Nieprawidłowy certyfikat SSL",
  "Invalid filename.": "Nieprawidłowa nazwa pliku.",
  "Inventory Overview": "Inventory Overview",
  "Inventory Value": "Inventory Value",
  Items: Items$1,
  Language: Language$1,
  "Last Name": "Last Name",
  "Last name": "Last name",
  LastName: LastName$1,
  "Latest Updates": "Latest Updates",
  "Length Required": "Wymagana długość",
  Like: Like$2,
  Load: Load$2,
  Localize: Localize$2,
  "Localized Content": "Localized Content",
  Location: Location$2,
  Locked: Locked$2,
  "Log In": "Zaloguj się",
  "Log Out": "Wyloguj się",
  "Log in": "Zaloguj się",
  "Log out": "Log out",
  Login: Login$2,
  Logo: Logo$1,
  Logout: Logout$2,
  "Loop Detected": "Wykryto pętlę",
  "Maintenance Mode": "Tryb konserwacji",
  "Manage general product info and public status.": "Manage general product info and public status.",
  "Manage how your customers can pay for orders.": "Manage how your customers can pay for orders.",
  Manufacturer: Manufacturer$1,
  Manufacturers: Manufacturers$1,
  Media: Media$1,
  Messages: Messages$1,
  "Method Not Allowed": "Niedozwolona metoda żądania",
  "Method Status": "Method Status",
  "Method is hidden from storefront": "Method is hidden from storefront",
  "Middle Name": "Middle Name",
  "Misdirected Request": "Błędnie skierowane żądanie",
  "Moved Permanently": "Trwale przekierowano",
  "Multi-Status": "Wielostanowy",
  "Multiple Choices": "Wiele opcji do wyboru",
  Name: Name$2,
  "Network Authentication Required": "Wymagane uwierzytelnianie w sieci",
  "Network Connect Timeout Error": "Błąd limitu czasu połączenia sieciowego",
  "Network Read Timeout Error": "Błąd limitu czasu odczytu sieci",
  New: New$2,
  "New :name": "Nowy :name",
  "New Password": "Nowe Hasło",
  "New Payment Method": "New Payment Method",
  "Next step": "Next step",
  No: No$2,
  "No Content": "Brak treści",
  "No items found": "No items found",
  "No payment methods found.": "No payment methods found.",
  "No version history available": "No version history available",
  "No versions found": "No versions found",
  "Non-Authoritative Information": "Informacje niepotwierdzone",
  "Not Acceptable": "Niedopuszczalne",
  "Not Extended": "Nie rozszerzono",
  "Not Found": "Nie Znaleziono",
  "Not Implemented": "Nie zaimplementowano",
  "Not Modified": "Niezmodyfikowany",
  OK: OK$2,
  "Old Price": "Old Price",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Po usunięciu konta wszystkie jego zasoby i dane zostaną trwale usunięte. Przed usunięciem konta pobierz wszelkie dane albo informacje, które chcesz zachować.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Po usunięciu konta wszystkie jego zasoby i dane zostaną trwale usunięte. Wprowadź hasło, aby potwierdzić, że chcesz trwale usunąć swoje konto.",
  Open: Open$2,
  "Open in a current window": "Otwórz w bieżącym oknie",
  "Open in a new window": "Otwórz w nowym oknie",
  "Open in a parent frame": "Otwórz w ramce nadrzędnej",
  "Open in the topmost frame": "Otwórz w najwyższej ramce",
  "Open on the website": "Otwórz na stronie",
  Order: Order$1,
  "Order Summary": "Order Summary",
  Orders: Orders$1,
  "Origin Is Unreachable": "Serwer źródłowy jest nieosiągalny",
  "Out of stock": "Out of stock",
  "Page Expired": "Strona Wygasła",
  Pages: Pages$1,
  "Pagination Navigation": "Nawigacja Stron",
  Parent: Parent$1,
  "Parent category": "Parent category",
  "Partial Content": "Częściowa zawartość",
  Password: Password$2,
  "Payload Too Large": "Ładunek zbyt duży",
  Payment: Payment$1,
  "Payment Methods": "Payment Methods",
  "Payment Required": "Płatność Wymagana",
  "Permanent Redirect": "Trwałe przekierowanie",
  "Personal Information": "Personal Information",
  Petrenko: Petrenko$1,
  "Petrenko Petro": "Petrenko Petro",
  Petro: Petro$1,
  Petrovych: Petrovych$1,
  Phone: Phone$1,
  "Plan (Roadmap)": "Plan (Roadmap)",
  "Please click the button below to verify your email address.": "Kliknij poniższy przycisk aby zweryfikować swój adres e-mail.",
  "Plus Code": "Plus Code",
  "Precondition Failed": "Warunek wstępny niespełniony",
  "Precondition Required": "Wymagany warunek wstępny",
  Preview: Preview$2,
  Price: Price$2,
  "Private (Hidden)": "Private (Hidden)",
  Processing: Processing$2,
  "Processing...": "Processing...",
  Profile: Profile$2,
  "Profile Information": "Informacje o Profilu",
  "Proxy Authentication Required": "Wymagane uwierzytelnienie serwera proxy",
  "Public (Visible)": "Public (Visible)",
  Quantity: Quantity$1,
  "Railgun Error": "Błąd Railguna",
  "Range Not Satisfiable": "Żądany zakres jest nieobsługiwany",
  "Recent Orders": "Recent Orders",
  "Recipient Last Name": "Recipient Last Name",
  "Recipient Name": "Recipient Name",
  "Recipient Phone": "Recipient Phone",
  Record: Record$2,
  "Ref Міста": "Ref Міста",
  "Ref Області": "Ref Області",
  "Ref Району": "Ref Району",
  "Regards,": "Z poważaniem,",
  Register: Register$2,
  "Release / Roadmap Progress": "Release / Roadmap Progress",
  "Remember me": "Zapamiętaj mnie",
  Remove: Remove$1,
  "Request Header Fields Too Large": "Za duże pola nagłówka żądania",
  "Request Timeout": "Limit czasu żądania został przekroczony",
  "Resend Verification Email": "Wyślij Ponownie E-mail Weryfikacyjny",
  "Reset Content": "Zresetuj zawartość",
  "Reset Password": "Zresetuj Hasło",
  "Reset Password Notification": "Powiadomienie o Zresetowaniu Hasła",
  Restore: Restore$2,
  "Restore :name": "Przywróć :name",
  "Retry With": "Spróbuj ponownie z użyciem",
  "Roadmap & versions": "Roadmap & versions",
  "SSL Handshake Failed": "Nieudane uzgadnianie SSL",
  Save: Save$2,
  "Save & Close": "Zapisz i zamknij",
  "Save & Return": "Zapisz i wróć",
  "Save :name": "Zapisz :name",
  "Save Changes": "Save Changes",
  "Save Settings": "Save Settings",
  "Saved.": "Zapisano.",
  "Saving...": "Saving...",
  Search: Search$2,
  "Search :name": "Szukaj :name",
  "Search city...": "Search city...",
  "Secure encrypted checkout": "Secure encrypted checkout",
  "See Other": "Zobacz inny zasób",
  Select: Select$2,
  "Select All": "Zaznacz wszystko",
  "Select city first": "Select city first",
  "Select how you want to receive your order": "Select how you want to receive your order",
  "Select warehouse...": "Select warehouse...",
  "Select your preferred payment method": "Select your preferred payment method",
  Send: Send$2,
  "Server Error": "Błąd Serwera",
  "Service Unavailable": "Serwis Niedostępny",
  "Session Has Expired": "Sesja wygasła – wymagane ponowne logowanie",
  Settings: Settings$2,
  Shipping: Shipping$1,
  "Shipping Details": "Shipping Details",
  Shippings: Shippings$1,
  "Shopping Cart": "Shopping Cart",
  Show: Show$2,
  "Show :name": "Pokaż :name",
  "Show All": "Pokaż wszystko",
  Showing: Showing$2,
  "Sign In": "Zalogować się",
  Solve: Solve$2,
  "Sort order": "Sort order",
  Start: Start$2,
  "Start Shopping": "Start Shopping",
  Status: Status$1,
  "Stock Alert": "Stock Alert",
  Stop: Stop$2,
  Submit: Submit$2,
  Subscribe: Subscribe$2,
  Subtotal: Subtotal$1,
  Summary: Summary$1,
  Switch: Switch$2,
  "Switch To Role": "Przełącz na rolę",
  "Switching Protocols": "Przełączanie protokołów",
  System: System$1,
  "System Code": "System Code",
  Tag: Tag$2,
  Tags: Tags$2,
  "Technical Configuration": "Technical Configuration",
  "Temporary Redirect": "Tymczasowe przekierowanie",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "Dziękujemy za zarejestrowanie się! Przed rozpoczęciem proszę zweryfikować swój adres e-mail, klikając w link, który właśnie wysłaliśmy do Ciebie e-mailem. Jeśli nie otrzymałeś e-maila, z przyjemnością prześlemy Ci kolejny.",
  "The given data was invalid.": "Podane dane były nieprawidłowe.",
  "The response is not a streamed response.": "Odpowiedź nie jest odpowiedzią przesyłaną strumieniowo.",
  "The response is not a view.": "Odpowiedź nie jest widokiem.",
  "This action is unauthorized.": "To działanie jest niedozwolone.",
  "This is a secure area of the application. Please confirm your password before continuing.": "To jest bezpieczny obszar aplikacji. Proszę potwierdzić hasło, aby kontynuować.",
  "This password reset link will expire in :count minutes.": "Link do resetowania hasła wygaśnie za :count minut.",
  Title: Title$1,
  "To Catalog": "To Catalog",
  "Toggle navigation": "Przełącz nawigację",
  "Too Early": "Żądanie złożone zbyt wcześnie",
  "Too Many Requests": "Zbyt Dużo Zapytań",
  Total: Total$1,
  "Total amount": "Total amount",
  Translate: Translate$2,
  "Translate It": "Przetłumacz to",
  Translations: Translations$1,
  "URI Too Long": "Zbyt długi identyfikator URI",
  Unauthorized: Unauthorized$2,
  "Unavailable For Legal Reasons": "Zablokowane z przyczyn prawnych",
  "Unknown Error": "Nieznany błąd",
  Unpack: Unpack$2,
  "Unprocessable Entity": "Nieprzetwarzalny zasób",
  Unsubscribe: Unsubscribe$2,
  "Unsupported Media Type": "Nieobsługiwany typ nośnika",
  Up: Up$2,
  Update: Update$2,
  "Update :name": "Aktualizuj :name",
  "Update Password": "Zaktualizuj Hasło",
  "Update your account's profile information and email address.": "Zaktualizuj informacje profilowe i adres e-mail swojego konta.",
  "Upgrade Required": "Wymagana aktualizacja",
  "Use Proxy": "Użyj serwera proxy",
  User: User$2,
  Users: Users$1,
  "Variant Also Negotiates": "Wariant również prowadzi negocjacje",
  "Verify Email Address": "Zweryfikuj Adres E-mail",
  Version: Version$1,
  Versions: Versions$1,
  View: View$2,
  "View :name": "Zobacz :name",
  "View Cart": "View Cart",
  "View Full Roadmap & History": "View Full Roadmap & History",
  Warehouse: Warehouse$1,
  "Warehouse / Delivery Address": "Warehouse / Delivery Address",
  "Warehouse/Address": "Warehouse/Address",
  Warehouses: Warehouses$1,
  "Web Server is Down": "Serwer sieciowy nie działa",
  "Whoops!": "Ups!",
  "Work hours": "Work hours",
  Yes: Yes$2,
  "You are receiving this email because we received a password reset request for your account.": "Otrzymujesz ten e-mail, ponieważ otrzymaliśmy prośbę o zresetowanie hasła dla Twojego konta.",
  "You're logged in!": "Jesteś zalogowany/a!",
  "Your Cart": "Your Cart",
  "Your Selection": "Your Selection",
  "Your cart is empty": "Your cart is empty",
  "Your email address is unverified.": "Adres e-mail nie został zweryfikowany.",
  "active this month": "active this month",
  ava: ava$1,
  email: email$2,
  errors: errors$2,
  female: female$1,
  "for faster checkout.": "for faster checkout.",
  inStoke: inStoke$1,
  male: male$1,
  name: name$2,
  of: of$2,
  "or drag and drop": "or drag and drop",
  other: other$1,
  password: password$2,
  "phone number": "phone number",
  "public": "public",
  results: results$2,
  tasks: tasks$1,
  to: to$3,
  "Інформація": "Інформація",
  "Інша": "Інша",
  "Історія замовлень": "Історія замовлень",
  "Адреса": "Адреса",
  "Активний": "Активний",
  "Бонусний рахунок": "Бонусний рахунок",
  "Введіть місто та № відділення": "Введіть місто та № відділення",
  "Виберіть місто...": "Виберіть місто...",
  "Вийти": "Вийти",
  "Вулиця та номер": "Вулиця та номер",
  "Відключений": "Відключений",
  "Графік": "Графік",
  "Графік роботи": "Графік роботи",
  "Дані для водіїв та клієнтів на мові": "Дані для водіїв та клієнтів на мові",
  "Дата народження": "Дата народження",
  "Жіноча": "Жіноча",
  "Завершити": "Завершити",
  "Зберегти зміни": "Зберегти зміни",
  "Зберігаємо...": "Зберігаємо...",
  "Знайти": "Знайти",
  "Кабінет": "Кабінет",
  "Контакти": "Контакти",
  "Контактний телефон": "Контактний телефон",
  "Локалізація": "Локалізація",
  "Методів доставки не знайдено": "Методів доставки не знайдено",
  "Місто / Населений пункт": "Місто / Населений пункт",
  "Назва": "Назва",
  "Назва для клієнтів...": "Назва для клієнтів...",
  "Назва складу": "Назва складу",
  "Наприклад: Центральний склад (Львів)": "Наприклад: Центральний склад (Львів)",
  "Опис / Орієнтири": "Опис / Орієнтири",
  "Орієнтири": "Орієнтири",
  "Особисті дані": "Особисті дані",
  "Оформлення замовлення": "Оформлення замовлення",
  "Перейти до покупок": "Перейти до покупок",
  "Пн-Пт: 09:00 - 18:00": "Пн-Пт: 09:00 - 18:00",
  "Порядок сортування": "Порядок сортування",
  "Посилання на Google Maps (URL)": "Посилання на Google Maps (URL)",
  "Редагувати": "Редагувати",
  "Синхронізація з логістикою (Refs)": "Синхронізація з логістикою (Refs)",
  "Системний код (ID)": "Системний код (ID)",
  "Склад / Локація": "Склад / Локація",
  "Статус": "Статус",
  "Статус складу": "Статус складу",
  "Стать": "Стать",
  "Телефон": "Телефон",
  "У вас поки немає замовлень": "У вас поки немає замовлень",
  "Увійти": "Увійти",
  "Чоловіча": "Чоловіча",
  "або": "або",
  "вул. Промислова, 10": "вул. Промислова, 10"
};
const __vite_glob_1_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept: Accept$2,
  Accepted: Accepted$2,
  Action: Action$2,
  Actions: Actions$2,
  Active: Active$1,
  Add: Add$2,
  Admin: Admin$2,
  Agree: Agree$2,
  Alias: Alias$1,
  Apply: Apply$1,
  Archive: Archive$2,
  Assign: Assign$2,
  Associate: Associate$2,
  Attach: Attach$2,
  Back: Back$1,
  Birthday: Birthday$1,
  Bonuses: Bonuses$1,
  Browse: Browse$2,
  Buy: Buy$1,
  Cancel: Cancel$2,
  Catalog: Catalog$1,
  Categories: Categories$1,
  Category: Category$1,
  Checkout: Checkout$1,
  Choose: Choose$2,
  City: City$1,
  Close: Close$2,
  Code: Code$1,
  Collapse: Collapse$2,
  Comment: Comment$2,
  Commerce: Commerce$1,
  Configuration: Configuration$1,
  Confirm: Confirm$2,
  Conflict: Conflict$2,
  Connect: Connect$2,
  Contacts: Contacts$1,
  Continue: Continue$2,
  Country: Country$1,
  Create: Create$2,
  Created: Created$2,
  Dashboard: Dashboard$2,
  Delete: Delete$2,
  Detach: Detach$2,
  Details: Details$2,
  Disable: Disable$2,
  Disabled: Disabled$1,
  Discard: Discard$2,
  Done: Done$2,
  Down: Down$2,
  Draft: Draft$1,
  Duplicate: Duplicate$2,
  Edit: Edit$2,
  Email: Email$2,
  Enable: Enable$2,
  Expand: Expand$2,
  Explanation: Explanation$2,
  Export: Export$2,
  Fee: Fee$1,
  File: File$2,
  Files: Files$2,
  Finish: Finish$1,
  Forbidden: Forbidden$2,
  Found: Found$2,
  Free: Free$1,
  Gender: Gender$1,
  General: General$1,
  Gone: Gone$2,
  Hide: Hide$2,
  Home: Home$2,
  ID: ID$1,
  Image: Image$2,
  Impersonate: Impersonate$2,
  Impersonation: Impersonation$2,
  Import: Import$2,
  Introduction: Introduction$2,
  Items: Items$1,
  Language: Language$1,
  LastName: LastName$1,
  Like: Like$2,
  Load: Load$2,
  Localize: Localize$2,
  Location: Location$2,
  Locked: Locked$2,
  Login: Login$2,
  Logo: Logo$1,
  Logout: Logout$2,
  Manufacturer: Manufacturer$1,
  Manufacturers: Manufacturers$1,
  Media: Media$1,
  Messages: Messages$1,
  Name: Name$2,
  New: New$2,
  No: No$2,
  OK: OK$2,
  Open: Open$2,
  Order: Order$1,
  Orders: Orders$1,
  Pages: Pages$1,
  Parent: Parent$1,
  Password: Password$2,
  Payment: Payment$1,
  Petrenko: Petrenko$1,
  Petro: Petro$1,
  Petrovych: Petrovych$1,
  Phone: Phone$1,
  Preview: Preview$2,
  Price: Price$2,
  Processing: Processing$2,
  Profile: Profile$2,
  Quantity: Quantity$1,
  Record: Record$2,
  Register: Register$2,
  Remove: Remove$1,
  Restore: Restore$2,
  Save: Save$2,
  Search: Search$2,
  Select: Select$2,
  Send: Send$2,
  Settings: Settings$2,
  Shipping: Shipping$1,
  Shippings: Shippings$1,
  Show: Show$2,
  Showing: Showing$2,
  Solve: Solve$2,
  Start: Start$2,
  Status: Status$1,
  Stop: Stop$2,
  Submit: Submit$2,
  Subscribe: Subscribe$2,
  Subtotal: Subtotal$1,
  Summary: Summary$1,
  Switch: Switch$2,
  System: System$1,
  Tag: Tag$2,
  Tags: Tags$2,
  Title: Title$1,
  Total: Total$1,
  Translate: Translate$2,
  Translations: Translations$1,
  Unauthorized: Unauthorized$2,
  Unpack: Unpack$2,
  Unsubscribe: Unsubscribe$2,
  Up: Up$2,
  Update: Update$2,
  User: User$2,
  Users: Users$1,
  Version: Version$1,
  Versions: Versions$1,
  View: View$2,
  Warehouse: Warehouse$1,
  Warehouses: Warehouses$1,
  Yes: Yes$2,
  ava: ava$1,
  default: pl,
  email: email$2,
  errors: errors$2,
  female: female$1,
  inStoke: inStoke$1,
  male: male$1,
  name: name$2,
  of: of$2,
  other: other$1,
  password: password$2,
  results: results$2,
  tasks: tasks$1,
  to: to$3
}, Symbol.toStringTag, { value: "Module" }));
const Accept$1 = "Принять";
const Accepted$1 = "Принято";
const Action$1 = "Действие";
const Actions$1 = "Действия";
const Add$1 = "Добавить";
const Admin$1 = "Панель администратора";
const Agree$1 = "Согласен(на)";
const Archive$1 = "Архив";
const Assign$1 = "Назначить";
const Associate$1 = "Ассоциировать";
const Attach$1 = "Прикрепить";
const Browse$1 = "Просмотр";
const Cancel$1 = "Отмена";
const Choose$1 = "Выбрать";
const Close$1 = "Закрыть";
const Collapse$1 = "Свернуть";
const Comment$1 = "Комментарий";
const Confirm$1 = "Подтвердить";
const Conflict$1 = "Конфликт";
const Connect$1 = "Подключить";
const Continue$1 = "Продолжить";
const Create$1 = "Создать";
const Created$1 = "Создано";
const Dashboard$1 = "Панель";
const Delete$1 = "Удалить";
const Detach$1 = "Открепить";
const Details$1 = "Подробности";
const Disable$1 = "Отключить";
const Discard$1 = "Отказаться";
const Done$1 = "Готово";
const Down$1 = "Вниз";
const Duplicate$1 = "Дублировать";
const Edit$1 = "Редактировать";
const Email$1 = "Адрес электронной почты";
const email$1 = "Значение поля :attribute должно быть действительным электронным адресом.";
const Enable$1 = "Включить";
const errors$1 = "ошибки";
const Expand$1 = "Раскрыть";
const Explanation$1 = "Объяснить";
const Export$1 = "Экспорт";
const File$1 = "Файл";
const Files$1 = "Файлы";
const Forbidden$1 = "Доступ запрещен";
const Found$1 = "Найдено";
const Gone$1 = "Удалено";
const Hide$1 = "Скрыть";
const Home$1 = "На главную";
const Image$1 = "Изображение";
const Impersonate$1 = "Войти под пользователем";
const Impersonation$1 = "Войти под пользователем";
const Import$1 = "Импорт";
const Introduction$1 = "Введение";
const Like$1 = "Нравится";
const Load$1 = "Загрузить";
const Localize$1 = "Локализовать";
const Location$1 = "Местоположение";
const Locked$1 = "Доступ заблокирован";
const Login$1 = "Войти";
const Logout$1 = "Выйти";
const Name$1 = "Имя";
const name$1 = "имя";
const New$1 = "Новый";
const No$1 = "Нет";
const of$1 = "из";
const OK$1 = "ОК";
const Open$1 = "Открыть";
const Password$1 = "Пароль";
const password$1 = "Некорректный пароль.";
const Preview$1 = "Предпросмотр";
const Price$1 = "Цена";
const Processing$1 = "Идет обработка";
const Profile$1 = "Профиль";
const Record$1 = "Запись";
const Register$1 = "Регистрация";
const Restore$1 = "Восстановить";
const results$1 = "результатов";
const Save$1 = "Сохранить";
const Search$1 = "Поиск";
const Select$1 = "Выбрать";
const Send$1 = "Отправить";
const Settings$1 = "Настройки";
const Show$1 = "Показать";
const Showing$1 = "Показано с";
const Solve$1 = "Решить";
const Start$1 = "Начать";
const Stop$1 = "Остановить";
const Submit$1 = "Отправить";
const Subscribe$1 = "Подписаться";
const Switch$1 = "Переключить";
const Tag$1 = "Тег";
const Tags$1 = "Теги";
const to$2 = "по";
const Translate$1 = "Перевод";
const Unauthorized$1 = "Не авторизован";
const Unpack$1 = "Распаковать";
const Unsubscribe$1 = "Отписаться";
const Up$1 = "Вверх";
const Update$1 = "Сохранить";
const User$1 = "Пользователь";
const View$1 = "Просмотр";
const Yes$1 = "Да";
const ru = {
  "(and :count more error)": "(и ещё :count ошибка)",
  "(and :count more errors)": "(и ещё :count ошибка)|(и ещё :count ошибки)|(и ещё :count ошибок)",
  "A decryption key is required.": "Ключ дешифровки обязателен.",
  "A new verification link has been sent to the email address you provided during registration.": "Новая ссылка для подтверждения была отправлена на Ваш адрес электронной почты, указанный при регистрации.",
  "A new verification link has been sent to your email address.": "На Ваш адрес электронной почты отправлена новая ссылка для подтверждения.",
  "A Timeout Occurred": "Истекло время ожидания",
  Accept: Accept$1,
  Accepted: Accepted$1,
  Action: Action$1,
  Actions: Actions$1,
  Add: Add$1,
  "Add :name": "Добавить :name",
  Admin: Admin$1,
  Agree: Agree$1,
  "All rights reserved.": "Все права защищены.",
  "Already registered?": "Уже зарегистрированы?",
  "Already Reported": "Уже сообщалось",
  Archive: Archive$1,
  "Are you sure you want to delete your account?": "Вы уверены что хотите удалить свою учётную запись?",
  Assign: Assign$1,
  Associate: Associate$1,
  Attach: Attach$1,
  "Bad Gateway": "Проблема с шлюзом",
  "Bad Request": "Некорректный запрос",
  "Bandwidth Limit Exceeded": "Превышена нагрузка на канал связи",
  Browse: Browse$1,
  Cancel: Cancel$1,
  Choose: Choose$1,
  "Choose :name": "Выбрать :name",
  "Choose File": "Выбрать файл",
  "Choose Image": "Выбрать изображение",
  "Click here to re-send the verification email.": "Нажмите здесь, чтобы повторно отправить электронное письмо для подтверждения.",
  "Click to copy": "Скопировать",
  "Client Closed Request": "Запрос закрыт клиентом",
  Close: Close$1,
  Collapse: Collapse$1,
  "Collapse All": "Свернуть всё",
  Comment: Comment$1,
  Confirm: Confirm$1,
  "Confirm Password": "Подтвердить пароль",
  Conflict: Conflict$1,
  Connect: Connect$1,
  "Connection Closed Without Response": "Соединение закрыто без ответа",
  "Connection Timed Out": "Соединение не отвечает",
  Continue: Continue$1,
  Create: Create$1,
  "Create :name": "Создать :name",
  Created: Created$1,
  "Current Password": "Текущий пароль",
  Dashboard: Dashboard$1,
  Delete: Delete$1,
  "Delete :name": "Удалить :name",
  "Delete Account": "Удалить аккаунт",
  Detach: Detach$1,
  Details: Details$1,
  Disable: Disable$1,
  Discard: Discard$1,
  Done: Done$1,
  Down: Down$1,
  Duplicate: Duplicate$1,
  "Duplicate :name": "Дублировать :name",
  Edit: Edit$1,
  "Edit :name": "Редактировать :name",
  Email: Email$1,
  email: email$1,
  "Email Password Reset Link": "Ссылка для сброса пароля",
  Enable: Enable$1,
  "Encrypted environment file already exists.": "Зашифрованный файл настроек окружения уже существует.",
  "Encrypted environment file not found.": "Зашифрованный файл настроек окружения не найден.",
  "Ensure your account is using a long, random password to stay secure.": "В целях безопасности убедитесь, что Вы используете длинный случайный пароль.",
  "Environment file already exists.": "Файл настроек окружения уже существует.",
  "Environment file not found.": "Файл настроек окружения не найден.",
  errors: errors$1,
  Expand: Expand$1,
  "Expand All": "Раскрыть всё",
  "Expectation Failed": "Истекло время ожидания",
  Explanation: Explanation$1,
  Export: Export$1,
  "Export :name": "Экспортировать :name",
  "Failed Dependency": "Ошибка зависимости",
  File: File$1,
  Files: Files$1,
  Forbidden: Forbidden$1,
  "Forgot your password?": "Забыли пароль?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Забыли пароль? Нет проблем. Просто сообщите Ваш адрес электронной почты и мы пришлём Вам ссылку для сброса пароля.",
  Found: Found$1,
  "Gateway Timeout": "Шлюз не отвечает",
  "Go Home": "Домой",
  "Go to page :page": "Перейти к :page-й странице",
  Gone: Gone$1,
  "Hello!": "Здравствуйте!",
  Hide: Hide$1,
  "Hide :name": "Скрыть :name",
  Home: Home$1,
  "HTTP Version Not Supported": "Версия HTTP не поддерживается",
  "I'm a teapot": "Я - чайник",
  "If you did not create an account, no further action is required.": "Если Вы не создавали учетную запись, никаких дополнительных действий не требуется.",
  "If you did not request a password reset, no further action is required.": "Если Вы не запрашивали восстановление пароля, никаких дополнительных действий не требуется.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Если у Вас возникли проблемы с нажатием кнопки ":actionText", скопируйте и вставьте приведенный ниже URL-адрес в свой браузер:',
  "IM Used": "Использовано IM",
  Image: Image$1,
  Impersonate: Impersonate$1,
  Impersonation: Impersonation$1,
  Import: Import$1,
  "Import :name": "Импорт :name",
  "Insufficient Storage": "Переполнение хранилища",
  "Internal Server Error": "Внутренняя ошибка",
  Introduction: Introduction$1,
  "Invalid filename.": "Некорректное имя файла.",
  "Invalid JSON was returned from the route.": "Маршрут вернул некорректный JSON.",
  "Invalid SSL Certificate": "Недействительный SSL сертификат",
  "Length Required": "Необходима длина",
  Like: Like$1,
  Load: Load$1,
  Localize: Localize$1,
  Location: Location$1,
  Locked: Locked$1,
  "Log In": "Войти",
  "Log in": "Войти",
  "Log Out": "Выйти",
  Login: Login$1,
  Logout: Logout$1,
  "Loop Detected": "Обнаружен бесконечный цикл",
  "Maintenance Mode": "Ведутся технические работы",
  "Method Not Allowed": "Метод запрещён",
  "Misdirected Request": "Неверный запрос",
  "Moved Permanently": "Перемещено навсегда",
  "Multi-Status": "Много статусов",
  "Multiple Choices": "Много вариантов",
  Name: Name$1,
  name: name$1,
  "Network Authentication Required": "Требуется сетевая аутентификация",
  "Network Connect Timeout Error": "Истекло время подключения",
  "Network Read Timeout Error": "Истекло время ожидания",
  New: New$1,
  "New :name": "Новый :name",
  "New Password": "Новый пароль",
  No: No$1,
  "No Content": "Содержимое отсутствует",
  "Non-Authoritative Information": "Информация не авторитетна",
  "Not Acceptable": "Неприемлемо",
  "Not Extended": "Не расширено",
  "Not Found": "Не найдено",
  "Not Implemented": "Не реализовано",
  "Not Modified": "Не изменялось",
  of: of$1,
  OK: OK$1,
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "После удаления Вашей учётной записи все её ресурсы и данные будут удалены без возможности восстановления. Перед удалением учётной записи загрузите данные и информацию, которую хотите сохранить.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "После удаления Вашей учётной записи все её ресурсы и данные будут удалены без возможности восстановления. Пожалуйста, введите свой пароль для подтверждения удаления учётной записи.",
  Open: Open$1,
  "Open in a current window": "Открыть в текущем окне",
  "Open in a new window": "Открыть в новом окне",
  "Open in a parent frame": "Открыть в родительском фрейме",
  "Open in the topmost frame": "Открыть в главном фрейме",
  "Open on the website": "Открыть на сайте",
  "Origin Is Unreachable": "Источник недоступен",
  "Page Expired": "Страница устарела",
  "Pagination Navigation": "Навигация",
  "Partial Content": "Не полное содержимое",
  Password: Password$1,
  password: password$1,
  "Payload Too Large": "Большой объём данных",
  "Payment Required": "Необходима оплата",
  "Permanent Redirect": "Постоянное перенаправление",
  "Please click the button below to verify your email address.": "Пожалуйста, нажмите кнопку ниже, чтобы подтвердить свой адрес электронной почты.",
  "Precondition Failed": "Условие ложно",
  "Precondition Required": "Требуется предусловие",
  Preview: Preview$1,
  Price: Price$1,
  Processing: Processing$1,
  Profile: Profile$1,
  "Profile Information": "Информация профиля",
  "Proxy Authentication Required": "Требуется аутентификация прокси",
  "Railgun Error": "Ошибка соединения с Railgun",
  "Range Not Satisfiable": "Диапазон недостижим",
  Record: Record$1,
  "Regards,": "С уважением,",
  Register: Register$1,
  "Remember me": "Запомнить меня",
  "Request Header Fields Too Large": "Поля заголовка слишком большие",
  "Request Timeout": "Истекло время ожидания",
  "Resend Verification Email": "Выслать повторно письмо для подтверждения",
  "Reset Content": "Сброс содержимого",
  "Reset Password": "Сбросить пароль",
  "Reset Password Notification": "Оповещение о сбросе пароля",
  Restore: Restore$1,
  "Restore :name": "Восстановить :name",
  results: results$1,
  "Retry With": "Повторить с",
  Save: Save$1,
  "Save & Close": "Сохранить и закрыть",
  "Save & Return": "Сохранить и вернуться",
  "Save :name": "Сохранить :name",
  "Saved.": "Сохранено.",
  Search: Search$1,
  "Search :name": "Поиск :name",
  "See Other": "Смотри другое",
  Select: Select$1,
  "Select All": "Выбрать всё",
  Send: Send$1,
  "Server Error": "Ошибка сервера",
  "Service Unavailable": "Сервис недоступен",
  "Session Has Expired": "Сессия устарела",
  Settings: Settings$1,
  Show: Show$1,
  "Show :name": "Показать :name",
  "Show All": "Показать всё",
  Showing: Showing$1,
  "Sign In": "Регистрация",
  Solve: Solve$1,
  "SSL Handshake Failed": "Квитирование SSL не удалось",
  Start: Start$1,
  Stop: Stop$1,
  Submit: Submit$1,
  Subscribe: Subscribe$1,
  Switch: Switch$1,
  "Switch To Role": "Переключиться на роль",
  "Switching Protocols": "Переключение протоколов",
  Tag: Tag$1,
  Tags: Tags$1,
  "Temporary Redirect": "Временное перенаправление",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "Спасибо за регистрацию! Прежде чем начать, не могли бы Вы подтвердить адрес своей электронной почты перейдя по ссылке, которую мы Вам отправили? Если Вы не получили письмо, мы с радостью отправим новое.",
  "The given data was invalid.": "Указанные данные недействительны.",
  "The response is not a streamed response.": "Ответ не является потоковым.",
  "The response is not a view.": "Ответ не является представлением.",
  "This action is unauthorized.": "Действие не авторизовано.",
  "This is a secure area of the application. Please confirm your password before continuing.": "Это защищённая область приложения. Пожалуйста, подтвердите Ваш пароль, прежде чем продолжить.",
  "This password reset link will expire in :count minutes.": "Срок действия ссылки для сброса пароля истекает через :count минут.",
  to: to$2,
  "Toggle navigation": "Переключить навигацию",
  "Too Early": "Слишком рано",
  "Too Many Requests": "Слишком много запросов",
  Translate: Translate$1,
  "Translate It": "Перевести",
  Unauthorized: Unauthorized$1,
  "Unavailable For Legal Reasons": "Недоступно по юридическим причинам",
  "Unknown Error": "Неизвестная ошибка",
  Unpack: Unpack$1,
  "Unprocessable Entity": "Необрабатываемый экземпляр",
  Unsubscribe: Unsubscribe$1,
  "Unsupported Media Type": "Неподдерживаемый тип данных",
  Up: Up$1,
  Update: Update$1,
  "Update :name": "Обновить :name",
  "Update Password": "Обновить пароль",
  "Update your account's profile information and email address.": "Обновите информацию и адрес электронной почты в профиле учётной записи.",
  "Upgrade Required": "Требуется обновление",
  "URI Too Long": "URI слишком длинный",
  "Use Proxy": "Используй прокси",
  User: User$1,
  "Variant Also Negotiates": "Вариант тоже проводит согласование",
  "Verify Email Address": "Подтвердить адрес электронной почты",
  View: View$1,
  "View :name": "Посмотреть :name",
  "Web Server is Down": "Веб-сервер не работает",
  "Whoops!": "Упс!",
  Yes: Yes$1,
  "You are receiving this email because we received a password reset request for your account.": "Вы получили это письмо, потому что мы получили запрос на сброс пароля для Вашей учётной записи.",
  "You're logged in!": "Вы уже вошли.",
  "Your email address is unverified.": "Ваш адрес электронной почты не подтверждён."
};
const __vite_glob_1_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept: Accept$1,
  Accepted: Accepted$1,
  Action: Action$1,
  Actions: Actions$1,
  Add: Add$1,
  Admin: Admin$1,
  Agree: Agree$1,
  Archive: Archive$1,
  Assign: Assign$1,
  Associate: Associate$1,
  Attach: Attach$1,
  Browse: Browse$1,
  Cancel: Cancel$1,
  Choose: Choose$1,
  Close: Close$1,
  Collapse: Collapse$1,
  Comment: Comment$1,
  Confirm: Confirm$1,
  Conflict: Conflict$1,
  Connect: Connect$1,
  Continue: Continue$1,
  Create: Create$1,
  Created: Created$1,
  Dashboard: Dashboard$1,
  Delete: Delete$1,
  Detach: Detach$1,
  Details: Details$1,
  Disable: Disable$1,
  Discard: Discard$1,
  Done: Done$1,
  Down: Down$1,
  Duplicate: Duplicate$1,
  Edit: Edit$1,
  Email: Email$1,
  Enable: Enable$1,
  Expand: Expand$1,
  Explanation: Explanation$1,
  Export: Export$1,
  File: File$1,
  Files: Files$1,
  Forbidden: Forbidden$1,
  Found: Found$1,
  Gone: Gone$1,
  Hide: Hide$1,
  Home: Home$1,
  Image: Image$1,
  Impersonate: Impersonate$1,
  Impersonation: Impersonation$1,
  Import: Import$1,
  Introduction: Introduction$1,
  Like: Like$1,
  Load: Load$1,
  Localize: Localize$1,
  Location: Location$1,
  Locked: Locked$1,
  Login: Login$1,
  Logout: Logout$1,
  Name: Name$1,
  New: New$1,
  No: No$1,
  OK: OK$1,
  Open: Open$1,
  Password: Password$1,
  Preview: Preview$1,
  Price: Price$1,
  Processing: Processing$1,
  Profile: Profile$1,
  Record: Record$1,
  Register: Register$1,
  Restore: Restore$1,
  Save: Save$1,
  Search: Search$1,
  Select: Select$1,
  Send: Send$1,
  Settings: Settings$1,
  Show: Show$1,
  Showing: Showing$1,
  Solve: Solve$1,
  Start: Start$1,
  Stop: Stop$1,
  Submit: Submit$1,
  Subscribe: Subscribe$1,
  Switch: Switch$1,
  Tag: Tag$1,
  Tags: Tags$1,
  Translate: Translate$1,
  Unauthorized: Unauthorized$1,
  Unpack: Unpack$1,
  Unsubscribe: Unsubscribe$1,
  Up: Up$1,
  Update: Update$1,
  User: User$1,
  View: View$1,
  Yes: Yes$1,
  default: ru,
  email: email$1,
  errors: errors$1,
  name: name$1,
  of: of$1,
  password: password$1,
  results: results$1,
  to: to$2
}, Symbol.toStringTag, { value: "Module" }));
const Accept = "прийняти";
const Accepted = "Прийнято";
const Action = "Дія";
const Actions = "Дії";
const Active = "Active";
const Add = "Додати";
const Admin = "адмін";
const Agree = "Погодьтеся";
const Alias = "Alias";
const Apply = "Apply";
const Archive = "Архів";
const Assign = "Призначити";
const Associate = "асоційований";
const Attach = "Прикріпити";
const Back = "Back";
const Birthday = "Birthday";
const Bonuses = "Bonuses";
const Browse = "переглядати";
const Buy = "Buy";
const Cancel = "Відмінити";
const Catalog = "Catalog";
const Categories = "Категорії";
const Category = "Категорія";
const Checkout = "Оформлення замовлення";
const Choose = "Вибрати";
const City = "City";
const Close = "Закрити";
const Code = "Code";
const Collapse = "Згорнути";
const Comment = "коментар";
const Commerce = "Commerce";
const Configuration = "Configuration";
const Confirm = "Підтвердити";
const Conflict = "Конфлікт";
const Connect = "Підключитися";
const Contacts = "Contacts";
const Continue = "Продовжити";
const Country = "Country";
const Create = "Створити";
const Created = "Створено";
const Dashboard = "Dashboard";
const Delete = "Видалити";
const Detach = "Від'єднати";
const Details = "Подробиці";
const Disable = "Вимкнути";
const Disabled = "Disabled";
const Discard = "Відкинути";
const Done = "Готово";
const Down = "вниз";
const Draft = "Draft";
const Duplicate = "дублікат";
const Edit = "Редагувати";
const Email = "Електронна пошта";
const Enable = "Увімкнути";
const Expand = "Розгорнути";
const Explanation = "Пояснення";
const Export = "Експорт";
const Fee = "Fee";
const File = "Файл";
const Files = "Файли";
const Finish = "Finish";
const Forbidden = "Заборонено";
const Found = "Знайдено";
const Free = "Free";
const Gender = "Gender";
const General = "General";
const Gone = "Видалено";
const Hide = "Сховати";
const Home = "Головна";
const ID = "ID";
const Image = "Зображення";
const Impersonate = "Зайти під виглядом користувача";
const Impersonation = "Уособлення";
const Import = "Імпорт";
const Introduction = "вступ";
const Items = "Товари";
const Language = "Language";
const LastName = "LastName";
const Like = "Люблю";
const Load = "навантаження";
const Localize = "Локалізуйте";
const Location = "Місцезнаходження";
const Locked = "Заблоковано";
const Login = "Увійти";
const Logo = "Logo";
const Logout = "Вийти";
const Manufacturer = "Manufacturer";
const Manufacturers = "Виробники";
const Media = "Media";
const Messages = "Messages";
const Name = "Ім'я";
const New = "Новий";
const No = "Ні";
const OK = "ОК";
const Open = "ВІДЧИНЕНО";
const Order = "Order";
const Orders = "Замовлення";
const Pages = "Сторінки";
const Parent = "Parent";
const Password = "Пароль";
const Payment = "Payment";
const Petrenko = "Petrenko";
const Petro = "Petro";
const Petrovych = "Petrovych";
const Phone = "Phone";
const Preview = "Попередній перегляд";
const Price = "Ціна";
const Processing = "Йде обробка";
const Profile = "Профіль";
const Quantity = "Quantity";
const Record = "запис";
const Register = "Реєстрація";
const Remove = "Remove";
const Restore = "Відновити";
const Save = "Зберегти";
const Search = "Пошук";
const Select = "Вибрати";
const Send = "Надіслати";
const Settings = "Налаштування";
const Shipping = "Shipping";
const Shippings = "Shippings";
const Show = "Показати";
const Showing = "Показ";
const Solve = "Розв'язати";
const Start = "Почніть";
const Status = "Status";
const Stop = "СТІЙ";
const Submit = "Надіслати";
const Subscribe = "Підписатися";
const Subtotal = "Subtotal";
const Summary = "Summary";
const Switch = "Перемикач";
const System = "System";
const Tag = "Тег";
const Tags = "Теги";
const Title = "Title";
const Total = "Total";
const Translate = "Перекласти";
const Translations = "Переклади";
const Unauthorized = "Неавторизований";
const Unpack = "Розпакуйте";
const Unsubscribe = "Відписатися";
const Up = "вгору";
const Update = "Оновити";
const User = "Користувач";
const Users = "Користувачі";
const Version = "Version";
const Versions = "Versions";
const View = "Переглянути";
const Warehouse = "Warehouse";
const Warehouses = "Warehouses";
const Yes = "Так";
const ava = "ava";
const email = "Поле :attribute повинне містити коректну електронну адресу.";
const errors = "помилки";
const female = "female";
const inStoke = "inStoke";
const male = "male";
const name = "ім'я";
const of = "з";
const other = "other";
const password = "Пароль невірний.";
const results = "результати";
const tasks = "tasks";
const to$1 = "до";
const uk = {
  "#ID": "#ID",
  "(and :count more error)": "(та ще :count помилка)",
  "(and :count more errors)": "(та ще :count помилка)|(та ще :count помилки)|(та ще :count помилок)",
  "A Timeout Occurred": "Виник тайм-аут",
  "A decryption key is required.": "Потрібен ключ розшифрування.",
  "A new verification link has been sent to the email address you provided during registration.": "На електронну адресу, яку ви вказали під час реєстрації, надіслано нове посилання для підтвердження.",
  "A new verification link has been sent to your email address.": "На вашу електронну адресу надіслано нове посилання для підтвердження.",
  "About you": "About you",
  Accept,
  Accepted,
  Action,
  Actions,
  Active,
  Add,
  "Add :name": "Додайте :name",
  "Add Method": "Add Method",
  "Add some fertilizers to start your order": "Add some fertilizers to start your order",
  Admin,
  Agree,
  Alias,
  "All rights reserved": "All rights reserved",
  "All rights reserved.": "Усі права захищені.",
  "Already Reported": "Вже повідомлено",
  "Already registered?": "Вже зареєстровані?",
  "Another recipient": "Another recipient",
  Apply,
  Archive,
  "Are you sure you want to delete this element?": "Are you sure you want to delete this element?",
  "Are you sure you want to delete this payment method?": "Are you sure you want to delete this payment method?",
  "Are you sure you want to delete this?": "Are you sure you want to delete this?",
  "Are you sure you want to delete your account?": "Ви впевнені, що хочете видалити свій обліковий запис?",
  Assign,
  Associate,
  Attach,
  "Available bonuses": "Available bonuses",
  Back,
  "Bad Gateway": "Невірний шлюз",
  "Bad Request": "Поганий запит",
  "Bandwidth Limit Exceeded": "Перевищено обмеження пропускної здатності",
  Birthday,
  "Bonus Balance": "Bonus Balance",
  Bonuses,
  Browse,
  Buy,
  Cancel,
  "Cart is empty": "Cart is empty",
  Catalog,
  Categories,
  Category,
  Checkout,
  Choose,
  "Choose :name": "Виберіть :name",
  "Choose File": "Виберіть файл",
  "Choose Image": "Виберіть Зображення",
  City,
  "Click here to re-send the verification email.": "Натисніть тут, щоб повторно надіслати електронний лист для підтвердження.",
  "Click to copy": "Натисніть, щоб скопіювати",
  "Click to upload": "Click to upload",
  "Client Closed Request": "Клієнт закритий запит",
  Close,
  Code,
  Collapse,
  "Collapse All": "Закрити все",
  Comment,
  Commerce,
  "Commission Percent (%)": "Commission Percent (%)",
  Configuration,
  Confirm,
  "Confirm Order": "Підтвердити замовлення",
  "Confirm Password": "Підтвердити пароль",
  Conflict,
  Connect,
  "Connection Closed Without Response": "З'єднання закрито без відповіді",
  "Connection Timed Out": "Сплив час підключення",
  "Contact Information": "Контактна інформація",
  Contacts,
  Continue,
  "Continue Shopping": "Continue Shopping",
  Country,
  Create,
  "Create :name": "Створити :name",
  "Create Payment Method": "Create Payment Method",
  Created,
  "Current Password": "Поточний пароль",
  Dashboard,
  "Date": "Date",
  Delete,
  "Delete :name": "Видалити :name",
  "Delete Account": "Видалити обліковий запис",
  "Department №1, str. Main...": "Department №1, str. Main...",
  Detach,
  Details,
  Disable,
  Disabled,
  Discard,
  "Display Order": "Display Order",
  Done,
  Down,
  Draft,
  Duplicate,
  "Duplicate :name": "Дублікат: ім'я",
  Edit,
  "Edit :name": "Редагувати :name",
  "Edit Profile": "Edit Profile",
  Email,
  "Email Password Reset Link": "Посилання для скидання пароля електронної пошти",
  "Email складу": "Email складу",
  Enable,
  "Encrypted environment file already exists.": "Зашифрований файл середовища вже існує",
  "Encrypted environment file not found.": "Зашифрований файл середовища не знайдено",
  "Ensure your account is using a long, random password to stay secure.": "Щоб захистити себе, переконайтеся, що ваш обліковий запис використовує довгий пароль, який важко вгадати.",
  "Enter your last name": "Enter your last name",
  "Enter your name": "Enter your name",
  "Environment file already exists.": "Файл середовища вже існує.",
  "Environment file not found.": "Файл середовища не знайдено.",
  Expand,
  "Expand All": "Розгорнути все",
  "Expectation Failed": "Очікування не виконано",
  Explanation,
  Export,
  "Export :name": "Export :name",
  "Failed Dependency": "Помилка залежності",
  Fee,
  File,
  Files,
  "Fill in your details or login": "Fill in your details or login",
  Finish,
  "First Name": "First Name",
  "Fixed Fee (Amount)": "Fixed Fee (Amount)",
  Forbidden,
  "Forgot your password?": "Забули пароль?",
  "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.": "Забули свій пароль? Нічого. Просто повідомте нам свою електронну адресу, і ми надішлемо вам посилання, яке дозволить змінити пароль.",
  Found,
  Free,
  "Full Name": "Full Name",
  "Gateway Timeout": "Шлюз не відповідає",
  Gender,
  General,
  "General Data": "General Data",
  "Go Home": "На головну",
  "Go to Checkout": "Go to Checkout",
  "Go to page :page": "Перейти на сторінку :page",
  Gone,
  "HTTP Version Not Supported": "Версія HTTP не підтримується",
  "Have an account?": "Ви зареєстровані?",
  "Hello!": "Привіт!",
  Hide,
  "Hide :name": "Сховати :name",
  Home,
  "I'm a teapot": "Я чайник",
  ID,
  "IM Used": "Використано IM",
  "If you did not create an account, no further action is required.": "Якщо ви не створювали облікового запису, подальші дії не потрібні.",
  "If you did not request a password reset, no further action is required.": "Якщо ви не надсилали запит на скидання паролю, подальші дії не потрібні.",
  'If you\'re having trouble clicking the ":actionText" button, copy and paste the URL below\ninto your web browser:': 'Якщо у вас виникли проблеми з кнопкою ":actionText", скопіюйте та вставте нижчеподаний URL у свій браузер:',
  Image,
  Impersonate,
  Impersonation,
  Import,
  "Import :name": "Імпорт :name",
  "In Cart": "In Cart",
  "In Progress": "In Progress",
  "Insufficient Storage": "Недостатньо місця",
  "Internal Server Error": "Внутрішня помилка сервера",
  Introduction,
  "Invalid JSON was returned from the route.": "З маршруту повернуто недійсний JSON.",
  "Invalid SSL Certificate": "Недійсний сертифікат SSL",
  "Invalid filename.": "Недійсна назва файлу.",
  "Inventory Overview": "Inventory Overview",
  "Inventory Value": "Inventory Value",
  Items,
  Language,
  "Last Name": "Last Name",
  "Last name": "Last name",
  LastName,
  "Latest Updates": "Latest Updates",
  "Length Required": "Необхідна довжина",
  Like,
  Load,
  Localize,
  "Localized Content": "Localized Content",
  Location,
  Locked,
  "Log In": "Увійти",
  "Log Out": "Вийти з системи",
  "Log in": "Увійти",
  "Log out": "Log out",
  Login,
  Logo,
  Logout,
  "Loop Detected": "Виявлено цикл",
  "Maintenance Mode": "Режим обслуговування",
  "Manage general product info and public status.": "Manage general product info and public status.",
  "Manage how your customers can pay for orders.": "Manage how your customers can pay for orders.",
  Manufacturer,
  Manufacturers,
  Media,
  Messages,
  "Method Not Allowed": "Метод заборонений",
  "Method Status": "Method Status",
  "Method is hidden from storefront": "Method is hidden from storefront",
  "Middle Name": "Middle Name",
  "Misdirected Request": "Неправильний запит",
  "Moved Permanently": "Переміщено назавжди",
  "Multi-Status": "Мультистатус",
  "Multiple Choices": "Кілька варіантів",
  Name,
  "Network Authentication Required": "Потрібна мережева автентифікація",
  "Network Connect Timeout Error": "Сплив час підключення до мережі",
  "Network Read Timeout Error": "Сплив час читання мережі",
  New,
  "New :name": "Новий :name",
  "New Password": "Новий пароль",
  "New Payment Method": "New Payment Method",
  "Next step": "Next step",
  No,
  "No Content": "Немає вмісту",
  "No items found": "No items found",
  "No payment methods found.": "No payment methods found.",
  "No version history available": "No version history available",
  "No versions found": "No versions found",
  "Non-Authoritative Information": "Інформація не авторитетна",
  "Not Acceptable": "Не прийнятний",
  "Not Extended": "Не розширено",
  "Not Found": "Не знайдено",
  "Not Implemented": "Не впроваджений",
  "Not Modified": "Не змінено",
  OK,
  "Old Price": "Old Price",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.": "Після видалення вашого облікового запису всі його ресурси та дані будуть видалені назавжди. Перш ніж видалити свій обліковий запис, завантажте будь-які дані чи інформацію, які ви хочете зберегти.",
  "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.": "Після видалення вашого облікового запису всі його ресурси та дані буде видалено назавжди. Будь ласка, введіть свій пароль, щоб підтвердити, що ви хочете повністю видалити свій обліковий запис.",
  Open,
  "Open in a current window": "Відкрити в поточному вікні",
  "Open in a new window": "Відкрити в новому вікні",
  "Open in a parent frame": "Відкрити в батьківському фреймі",
  "Open in the topmost frame": "Відкрити в самому верхньому кадрі",
  "Open on the website": "Відкрити на сайті",
  Order,
  "Order Summary": "Order Summary",
  Orders,
  "Origin Is Unreachable": "Джерело недоступне",
  "Out of stock": "Out of stock",
  "Page Expired": "Час сесії минув",
  Pages,
  "Pagination Navigation": "Навігація пагінацією",
  Parent,
  "Parent category": "Parent category",
  "Partial Content": "Частковий вміст",
  Password,
  "Payload Too Large": "Корисне навантаження занадто велике",
  Payment,
  "Payment Methods": "Payment Methods",
  "Payment Required": "Потрібна оплата",
  "Permanent Redirect": "Постійне перенаправлення",
  "Personal Information": "Personal Information",
  Petrenko,
  "Petrenko Petro": "Petrenko Petro",
  Petro,
  Petrovych,
  Phone,
  "Plan (Roadmap)": "Plan (Roadmap)",
  "Please click the button below to verify your email address.": "Будь ласка, натисніть кнопку нижче, щоб підтвердити свою електронну адресу.",
  "Plus Code": "Plus Code",
  "Precondition Failed": "Хибна умова",
  "Precondition Required": "Необхідна передумова",
  Preview,
  Price,
  "Private (Hidden)": "Private (Hidden)",
  Processing,
  "Processing...": "Processing...",
  Profile,
  "Profile Information": "Інформація про профіль",
  "Proxy Authentication Required": "Потрібна автентифікація проксі",
  "Public (Visible)": "Public (Visible)",
  Quantity,
  "Railgun Error": "Помилка Railgun",
  "Range Not Satisfiable": "Діапазон недосяжний",
  "Recent Orders": "Recent Orders",
  "Recipient Last Name": "Recipient Last Name",
  "Recipient Name": "Recipient Name",
  "Recipient Phone": "Recipient Phone",
  Record,
  "Ref Міста": "Ref Міста",
  "Ref Області": "Ref Області",
  "Ref Району": "Ref Району",
  "Regards,": "З повагою,",
  Register,
  "Release / Roadmap Progress": "Release / Roadmap Progress",
  "Remember me": "Запам'ятати мене",
  Remove,
  "Request Header Fields Too Large": "Завеликі поля заголовка запиту",
  "Request Timeout": "Сплинув час очікування",
  "Resend Verification Email": "Відправити лист із підтвердженням",
  "Reset Content": "Скинути вміст",
  "Reset Password": "Скинути пароль",
  "Reset Password Notification": "Сповіщення про скидання пароля",
  Restore,
  "Restore :name": "Відновити :name",
  "Retry With": "Повторити з",
  "Roadmap & versions": "Roadmap & versions",
  "SSL Handshake Failed": "Помилка рукостискання SSL",
  Save,
  "Save & Close": "Зберегти та закрити",
  "Save & Return": "Зберегти та повернути",
  "Save :name": "Зберегти :name",
  "Save Changes": "Save Changes",
  "Save Settings": "Save Settings",
  "Saved.": "Збережено.",
  "Saving...": "Saving...",
  Search,
  "Search :name": "Пошук :name",
  "Search city...": "Search city...",
  "Secure encrypted checkout": "Secure encrypted checkout",
  "See Other": "Дивіться інше",
  Select,
  "Select All": "Вибрати все",
  "Select city first": "Select city first",
  "Select how you want to receive your order": "Select how you want to receive your order",
  "Select warehouse...": "Select warehouse...",
  "Select your preferred payment method": "Select your preferred payment method",
  Send,
  "Server Error": "Помилка серверу",
  "Service Unavailable": "Сервіс недоступний",
  "Session Has Expired": "Сеанс закінчився",
  Settings,
  Shipping,
  "Shipping Details": "Shipping Details",
  Shippings,
  "Shopping Cart": "Shopping Cart",
  Show,
  "Show :name": "Показати :name",
  "Show All": "Покажи все",
  Showing,
  "Sign In": "Увійти",
  Solve,
  "Sort order": "Sort order",
  Start,
  "Start Shopping": "Start Shopping",
  Status,
  "Stock Alert": "Stock Alert",
  Stop,
  Submit,
  Subscribe,
  Subtotal,
  Summary,
  Switch,
  "Switch To Role": "Перейти на роль",
  "Switching Protocols": "Перемикання протоколів",
  System,
  "System Code": "System Code",
  Tag,
  Tags,
  "Technical Configuration": "Technical Configuration",
  "Temporary Redirect": "Тимчасове перенаправлення",
  "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.": "Дякуємо за реєстрацію! Перед початком роботи, підтвердіть свою електронну адресу, натиснувши посилання, яке ми щойно надіслали вам. Якщо ви не отримали листа, ми із задоволенням надішлемо вам ще один.",
  "The given data was invalid.": "Надані дані були недійсними.",
  "The response is not a streamed response.": "Відповідь не є потоковою відповіддю.",
  "The response is not a view.": "Відповідь не є переглядом.",
  "This action is unauthorized.": "Ця дія є неавторизованою.",
  "This is a secure area of the application. Please confirm your password before continuing.": "Це захищена частина застосунку. Будь ласка, підтвердіть ваш пароль, перш ніж продовжити.",
  "This password reset link will expire in :count minutes.": "Термін дії цього посилання для скидання пароля закінчується через :count хвилин.",
  Title,
  "To Catalog": "To Catalog",
  "Toggle navigation": "Перемкнути навігацію",
  "Too Early": "Зарано",
  "Too Many Requests": "Забагато запитів",
  Total,
  "Total amount": "Total amount",
  Translate,
  "Translate It": "Переклади це",
  Translations,
  "URI Too Long": "URI занадто довгий",
  Unauthorized,
  "Unavailable For Legal Reasons": "Недоступний з юридичних причин",
  "Unknown Error": "Невідома помилка",
  Unpack,
  "Unprocessable Entity": "Сутність, що не підлягає обробці",
  Unsubscribe,
  "Unsupported Media Type": "Непідтримуваний тип даних",
  Up,
  Update,
  "Update :name": "Оновлення :name",
  "Update Password": "Оновити пароль",
  "Update your account's profile information and email address.": "Оновіть дані профілю свого облікового запису та електронну адресу.",
  "Upgrade Required": "Потрібне оновлення",
  "Use Proxy": "Використовуйте проксі",
  User,
  Users,
  "Variant Also Negotiates": "Варіант також веде переговори",
  "Verify Email Address": "Підтвердьте електронну адресу",
  Version,
  Versions,
  View,
  "View :name": "Переглянути :name",
  "View Cart": "View Cart",
  "View Full Roadmap & History": "View Full Roadmap & History",
  Warehouse,
  "Warehouse / Delivery Address": "Warehouse / Delivery Address",
  "Warehouse/Address": "Warehouse/Address",
  Warehouses,
  "Web Server is Down": "Веб-сервер не працює",
  "Whoops!": "Упс!",
  "Work hours": "Work hours",
  Yes,
  "You are receiving this email because we received a password reset request for your account.": "Ви отримали цей електронний лист, оскільки ми отримали запит на скидання паролю для вашого облікового запису.",
  "You're logged in!": "Ви увійшли!",
  "Your Cart": "Your Cart",
  "Your Selection": "Your Selection",
  "Your cart is empty": "Your cart is empty",
  "Your email address is unverified.": "Ваша електронна адреса неверифікована.",
  "active this month": "active this month",
  ava,
  email,
  errors,
  female,
  "for faster checkout.": "for faster checkout.",
  inStoke,
  male,
  name,
  of,
  "or drag and drop": "or drag and drop",
  other,
  password,
  "phone number": "phone number",
  "public": "public",
  results,
  tasks,
  to: to$1,
  "Інформація": "Інформація",
  "Інша": "Інша",
  "Історія замовлень": "Історія замовлень",
  "Адреса": "Адреса",
  "Активний": "Активний",
  "Бонусний рахунок": "Бонусний рахунок",
  "Введіть місто та № відділення": "Введіть місто та № відділення",
  "Виберіть місто...": "Виберіть місто...",
  "Вийти": "Вийти",
  "Вулиця та номер": "Вулиця та номер",
  "Відключений": "Відключений",
  "Графік": "Графік",
  "Графік роботи": "Графік роботи",
  "Дані для водіїв та клієнтів на мові": "Дані для водіїв та клієнтів на мові",
  "Дата народження": "Дата народження",
  "Жіноча": "Жіноча",
  "Завершити": "Завершити",
  "Зберегти зміни": "Зберегти зміни",
  "Зберігаємо...": "Зберігаємо...",
  "Знайти": "Знайти",
  "Кабінет": "Кабінет",
  "Контакти": "Контакти",
  "Контактний телефон": "Контактний телефон",
  "Локалізація": "Локалізація",
  "Методів доставки не знайдено": "Методів доставки не знайдено",
  "Місто / Населений пункт": "Місто / Населений пункт",
  "Назва": "Назва",
  "Назва для клієнтів...": "Назва для клієнтів...",
  "Назва складу": "Назва складу",
  "Наприклад: Центральний склад (Львів)": "Наприклад: Центральний склад (Львів)",
  "Опис / Орієнтири": "Опис / Орієнтири",
  "Орієнтири": "Орієнтири",
  "Особисті дані": "Особисті дані",
  "Оформлення замовлення": "Оформлення замовлення",
  "Перейти до покупок": "Перейти до покупок",
  "Пн-Пт: 09:00 - 18:00": "Пн-Пт: 09:00 - 18:00",
  "Порядок сортування": "Порядок сортування",
  "Посилання на Google Maps (URL)": "Посилання на Google Maps (URL)",
  "Редагувати": "Редагувати",
  "Синхронізація з логістикою (Refs)": "Синхронізація з логістикою (Refs)",
  "Системний код (ID)": "Системний код (ID)",
  "Склад / Локація": "Склад / Локація",
  "Статус": "Статус",
  "Статус складу": "Статус складу",
  "Стать": "Стать",
  "Телефон": "Телефон",
  "У вас поки немає замовлень": "У вас поки немає замовлень",
  "Увійти": "Увійти",
  "Чоловіча": "Чоловіча",
  "або": "або",
  "вул. Промислова, 10": "вул. Промислова, 10"
};
const __vite_glob_1_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accept,
  Accepted,
  Action,
  Actions,
  Active,
  Add,
  Admin,
  Agree,
  Alias,
  Apply,
  Archive,
  Assign,
  Associate,
  Attach,
  Back,
  Birthday,
  Bonuses,
  Browse,
  Buy,
  Cancel,
  Catalog,
  Categories,
  Category,
  Checkout,
  Choose,
  City,
  Close,
  Code,
  Collapse,
  Comment,
  Commerce,
  Configuration,
  Confirm,
  Conflict,
  Connect,
  Contacts,
  Continue,
  Country,
  Create,
  Created,
  Dashboard,
  Delete,
  Detach,
  Details,
  Disable,
  Disabled,
  Discard,
  Done,
  Down,
  Draft,
  Duplicate,
  Edit,
  Email,
  Enable,
  Expand,
  Explanation,
  Export,
  Fee,
  File,
  Files,
  Finish,
  Forbidden,
  Found,
  Free,
  Gender,
  General,
  Gone,
  Hide,
  Home,
  ID,
  Image,
  Impersonate,
  Impersonation,
  Import,
  Introduction,
  Items,
  Language,
  LastName,
  Like,
  Load,
  Localize,
  Location,
  Locked,
  Login,
  Logo,
  Logout,
  Manufacturer,
  Manufacturers,
  Media,
  Messages,
  Name,
  New,
  No,
  OK,
  Open,
  Order,
  Orders,
  Pages,
  Parent,
  Password,
  Payment,
  Petrenko,
  Petro,
  Petrovych,
  Phone,
  Preview,
  Price,
  Processing,
  Profile,
  Quantity,
  Record,
  Register,
  Remove,
  Restore,
  Save,
  Search,
  Select,
  Send,
  Settings,
  Shipping,
  Shippings,
  Show,
  Showing,
  Solve,
  Start,
  Status,
  Stop,
  Submit,
  Subscribe,
  Subtotal,
  Summary,
  Switch,
  System,
  Tag,
  Tags,
  Title,
  Total,
  Translate,
  Translations,
  Unauthorized,
  Unpack,
  Unsubscribe,
  Up,
  Update,
  User,
  Users,
  Version,
  Versions,
  View,
  Warehouse,
  Warehouses,
  Yes,
  ava,
  default: uk,
  email,
  errors,
  female,
  inStoke,
  male,
  name,
  of,
  other,
  password,
  results,
  tasks,
  to: to$1
}, Symbol.toStringTag, { value: "Module" }));
var serverRenderer_cjs_prod = {};
var hasRequiredServerRenderer_cjs_prod;
function requireServerRenderer_cjs_prod() {
  if (hasRequiredServerRenderer_cjs_prod) return serverRenderer_cjs_prod;
  hasRequiredServerRenderer_cjs_prod = 1;
  Object.defineProperty(serverRenderer_cjs_prod, "__esModule", { value: true });
  var Vue = require$$0;
  var shared = require$$1;
  var compilerSsr = require$$2;
  function _interopNamespaceDefault(e2) {
    var n2 = /* @__PURE__ */ Object.create(null);
    if (e2) {
      for (var k2 in e2) {
        n2[k2] = e2[k2];
      }
    }
    n2.default = e2;
    return Object.freeze(n2);
  }
  var Vue__namespace = /* @__PURE__ */ _interopNamespaceDefault(Vue);
  const shouldIgnoreProp = /* @__PURE__ */ shared.makeMap(
    `,key,ref,innerHTML,textContent,ref_key,ref_for`
  );
  function ssrRenderAttrs(props, tag) {
    let ret = "";
    for (let key2 in props) {
      if (shouldIgnoreProp(key2) || shared.isOn(key2) || tag === "textarea" && key2 === "value" || // force as property (not rendered in SSR)
      key2.startsWith(".")) {
        continue;
      }
      const value = props[key2];
      if (key2.startsWith("^")) key2 = key2.slice(1);
      if (key2 === "class") {
        ret += ` class="${ssrRenderClass(value)}"`;
      } else if (key2 === "style") {
        ret += ` style="${ssrRenderStyle(value)}"`;
      } else if (key2 === "className") {
        if (value != null) {
          ret += ` class="${shared.escapeHtml(String(value))}"`;
        }
      } else {
        ret += ssrRenderDynamicAttr(key2, value, tag);
      }
    }
    return ret;
  }
  function ssrRenderDynamicAttr(key2, value, tag) {
    if (!shared.isRenderableAttrValue(value)) {
      return ``;
    }
    const attrKey = tag && (tag.indexOf("-") > 0 || shared.isSVGTag(tag)) ? key2 : shared.propsToAttrMap[key2] || key2.toLowerCase();
    if (shared.isBooleanAttr(attrKey)) {
      return shared.includeBooleanAttr(value) ? ` ${attrKey}` : ``;
    } else if (shared.isSSRSafeAttrName(attrKey)) {
      return value === "" ? ` ${attrKey}` : ` ${attrKey}="${shared.escapeHtml(value)}"`;
    } else {
      console.warn(
        `[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`
      );
      return ``;
    }
  }
  function ssrRenderAttr(key2, value) {
    if (!shared.isRenderableAttrValue(value)) {
      return ``;
    }
    return ` ${key2}="${shared.escapeHtml(value)}"`;
  }
  function ssrRenderClass(raw) {
    return shared.escapeHtml(shared.normalizeClass(raw));
  }
  function ssrRenderStyle(raw) {
    if (!raw) {
      return "";
    }
    if (shared.isString(raw)) {
      return shared.escapeHtml(raw);
    }
    const styles = shared.normalizeStyle(ssrResetCssVars(raw));
    return shared.escapeHtml(shared.stringifyStyle(styles));
  }
  function ssrResetCssVars(raw) {
    if (!shared.isArray(raw) && shared.isObject(raw)) {
      const res = {};
      for (const key2 in raw) {
        if (key2.startsWith(":--")) {
          res[key2.slice(1)] = shared.normalizeCssVarValue(raw[key2]);
        } else {
          res[key2] = raw[key2];
        }
      }
      return res;
    }
    return raw;
  }
  function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
    return renderComponentVNode(
      Vue.createVNode(comp, props, children),
      parentComponent,
      slotScopeId
    );
  }
  const { ensureValidVNode } = Vue.ssrUtils;
  function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId) {
    push(`<!--[-->`);
    ssrRenderSlotInner(
      slots,
      slotName,
      slotProps,
      fallbackRenderFn,
      push,
      parentComponent,
      slotScopeId
    );
    push(`<!--]-->`);
  }
  function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push, parentComponent, slotScopeId, transition) {
    const slotFn = slots[slotName];
    if (slotFn) {
      const slotBuffer = [];
      const bufferedPush = (item) => {
        slotBuffer.push(item);
      };
      const ret = slotFn(
        slotProps,
        bufferedPush,
        parentComponent,
        slotScopeId ? " " + slotScopeId : ""
      );
      if (shared.isArray(ret)) {
        const validSlotContent = ensureValidVNode(ret);
        if (validSlotContent) {
          renderVNodeChildren(
            push,
            validSlotContent,
            parentComponent,
            slotScopeId
          );
        } else if (fallbackRenderFn) {
          fallbackRenderFn();
        } else if (transition) {
          push(`<!---->`);
        }
      } else {
        let isEmptySlot = true;
        if (transition) {
          isEmptySlot = false;
        } else {
          for (let i2 = 0; i2 < slotBuffer.length; i2++) {
            if (!isComment(slotBuffer[i2])) {
              isEmptySlot = false;
              break;
            }
          }
        }
        if (isEmptySlot) {
          if (fallbackRenderFn) {
            fallbackRenderFn();
          }
        } else {
          let start = 0;
          let end = slotBuffer.length;
          if (transition && slotBuffer[0] === "<!--[-->" && slotBuffer[end - 1] === "<!--]-->") {
            start++;
            end--;
          }
          if (start < end) {
            for (let i2 = start; i2 < end; i2++) {
              push(slotBuffer[i2]);
            }
          } else if (transition) {
            push(`<!---->`);
          }
        }
      }
    } else if (fallbackRenderFn) {
      fallbackRenderFn();
    } else if (transition) {
      push(`<!---->`);
    }
  }
  const commentTestRE = /^<!--[\s\S]*-->$/;
  const commentRE = /<!--[^]*?-->/gm;
  function isComment(item) {
    if (typeof item !== "string" || !commentTestRE.test(item)) return false;
    if (item.length <= 8) return true;
    return !item.replace(commentRE, "").trim();
  }
  function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
    parentPush("<!--teleport start-->");
    const context = parentComponent.appContext.provides[Vue.ssrContextKey];
    const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
    const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
    const bufferIndex = targetBuffer.length;
    let teleportContent;
    if (disabled) {
      contentRenderFn(parentPush);
      teleportContent = `<!--teleport start anchor--><!--teleport anchor-->`;
    } else {
      const { getBuffer, push } = createBuffer();
      push(`<!--teleport start anchor-->`);
      contentRenderFn(push);
      push(`<!--teleport anchor-->`);
      teleportContent = getBuffer();
    }
    targetBuffer.splice(bufferIndex, 0, teleportContent);
    parentPush("<!--teleport end-->");
  }
  function ssrInterpolate(value) {
    return shared.escapeHtml(shared.toDisplayString(value));
  }
  function ssrRenderList(source, renderItem) {
    if (shared.isArray(source) || shared.isString(source)) {
      for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
        renderItem(source[i2], i2);
      }
    } else if (typeof source === "number") {
      for (let i2 = 0; i2 < source; i2++) {
        renderItem(i2 + 1, i2);
      }
    } else if (shared.isObject(source)) {
      if (source[Symbol.iterator]) {
        const arr = Array.from(source);
        for (let i2 = 0, l2 = arr.length; i2 < l2; i2++) {
          renderItem(arr[i2], i2);
        }
      } else {
        const keys2 = Object.keys(source);
        for (let i2 = 0, l2 = keys2.length; i2 < l2; i2++) {
          const key2 = keys2[i2];
          renderItem(source[key2], key2, i2);
        }
      }
    }
  }
  async function ssrRenderSuspense(push, { default: renderContent }) {
    if (renderContent) {
      renderContent();
    } else {
      push(`<!---->`);
    }
  }
  function ssrGetDirectiveProps(instance, dir, value, arg, modifiers = {}) {
    if (typeof dir !== "function" && dir.getSSRProps) {
      return dir.getSSRProps(
        {
          dir,
          instance: Vue.ssrUtils.getComponentPublicInstance(instance.$),
          value,
          oldValue: void 0,
          arg,
          modifiers
        },
        null
      ) || {};
    }
    return {};
  }
  const ssrLooseEqual = shared.looseEqual;
  function ssrLooseContain(arr, value) {
    return shared.looseIndexOf(arr, value) > -1;
  }
  function ssrRenderDynamicModel(type, model, value) {
    switch (type) {
      case "radio":
        return shared.looseEqual(model, value) ? " checked" : "";
      case "checkbox":
        return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? " checked" : "";
      default:
        return ssrRenderAttr("value", model);
    }
  }
  function ssrGetDynamicModelProps(existingProps = {}, model) {
    const { type, value } = existingProps;
    switch (type) {
      case "radio":
        return shared.looseEqual(model, value) ? { checked: true } : null;
      case "checkbox":
        return (shared.isArray(model) ? ssrLooseContain(model, value) : model) ? { checked: true } : null;
      default:
        return { value: model };
    }
  }
  var helpers = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ssrGetDirectiveProps,
    ssrGetDynamicModelProps,
    ssrIncludeBooleanAttr: shared.includeBooleanAttr,
    ssrInterpolate,
    ssrLooseContain,
    ssrLooseEqual,
    ssrRenderAttr,
    ssrRenderAttrs,
    ssrRenderClass,
    ssrRenderComponent,
    ssrRenderDynamicAttr,
    ssrRenderDynamicModel,
    ssrRenderList,
    ssrRenderSlot,
    ssrRenderSlotInner,
    ssrRenderStyle,
    ssrRenderSuspense,
    ssrRenderTeleport,
    ssrRenderVNode: renderVNode
  });
  const compileCache = /* @__PURE__ */ Object.create(null);
  function ssrCompile(template, instance) {
    const Component = instance.type;
    const { isCustomElement, compilerOptions } = instance.appContext.config;
    const { delimiters, compilerOptions: componentCompilerOptions } = Component;
    const finalCompilerOptions = shared.extend(
      shared.extend(
        {
          isCustomElement,
          delimiters
        },
        compilerOptions
      ),
      componentCompilerOptions
    );
    finalCompilerOptions.isCustomElement = finalCompilerOptions.isCustomElement || shared.NO;
    finalCompilerOptions.isNativeTag = finalCompilerOptions.isNativeTag || shared.NO;
    const cacheKey = JSON.stringify(
      {
        template,
        compilerOptions: finalCompilerOptions
      },
      (key2, value) => {
        return shared.isFunction(value) ? value.toString() : value;
      }
    );
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    finalCompilerOptions.onError = (err) => {
      {
        throw err;
      }
    };
    const { code } = compilerSsr.compile(template, finalCompilerOptions);
    const requireMap = {
      vue: Vue__namespace,
      "vue/server-renderer": helpers
    };
    const fakeRequire = (id) => requireMap[id];
    return compileCache[cacheKey] = Function("require", code)(fakeRequire);
  }
  const {
    createComponentInstance,
    setCurrentRenderingInstance,
    setupComponent,
    renderComponentRoot,
    normalizeVNode,
    pushWarningContext,
    popWarningContext
  } = Vue.ssrUtils;
  function createBuffer() {
    let appendable = false;
    const buffer = [];
    return {
      getBuffer() {
        return buffer;
      },
      push(item) {
        const isStringItem = shared.isString(item);
        if (appendable && isStringItem) {
          buffer[buffer.length - 1] += item;
          return;
        }
        buffer.push(item);
        appendable = isStringItem;
        if (shared.isPromise(item) || shared.isArray(item) && item.hasAsync) {
          buffer.hasAsync = true;
        }
      }
    };
  }
  function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
    const instance = vnode.component = createComponentInstance(
      vnode,
      parentComponent,
      null
    );
    const res = setupComponent(
      instance,
      true
      /* isSSR */
    );
    const hasAsyncSetup = shared.isPromise(res);
    let prefetches = instance.sp;
    if (hasAsyncSetup || prefetches) {
      const p2 = Promise.resolve(res).then(() => {
        if (hasAsyncSetup) prefetches = instance.sp;
        if (prefetches) {
          return Promise.all(
            prefetches.map((prefetch) => prefetch.call(instance.proxy))
          );
        }
      }).catch(shared.NOOP);
      return p2.then(() => renderComponentSubTree(instance, slotScopeId));
    } else {
      return renderComponentSubTree(instance, slotScopeId);
    }
  }
  function renderComponentSubTree(instance, slotScopeId) {
    const comp = instance.type;
    const { getBuffer, push } = createBuffer();
    if (shared.isFunction(comp)) {
      let root = renderComponentRoot(instance);
      if (!comp.props) {
        for (const key2 in instance.attrs) {
          if (key2.startsWith(`data-v-`)) {
            (root.props || (root.props = {}))[key2] = ``;
          }
        }
      }
      renderVNode(push, instance.subTree = root, instance, slotScopeId);
    } else {
      if ((!instance.render || instance.render === shared.NOOP) && !instance.ssrRender && !comp.ssrRender && shared.isString(comp.template)) {
        comp.ssrRender = ssrCompile(comp.template, instance);
      }
      const ssrRender = instance.ssrRender || comp.ssrRender;
      if (ssrRender) {
        let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
        let hasCloned = false;
        let cur = instance;
        while (true) {
          const scopeId = cur.vnode.scopeId;
          if (scopeId) {
            if (!hasCloned) {
              attrs = { ...attrs };
              hasCloned = true;
            }
            attrs[scopeId] = "";
          }
          const parent = cur.parent;
          if (parent && parent.subTree && parent.subTree === cur.vnode) {
            cur = parent;
          } else {
            break;
          }
        }
        if (slotScopeId) {
          if (!hasCloned) attrs = { ...attrs };
          const slotScopeIdList = slotScopeId.trim().split(" ");
          for (let i2 = 0; i2 < slotScopeIdList.length; i2++) {
            attrs[slotScopeIdList[i2]] = "";
          }
        }
        const prev = setCurrentRenderingInstance(instance);
        try {
          ssrRender(
            instance.proxy,
            push,
            instance,
            attrs,
            // compiler-optimized bindings
            instance.props,
            instance.setupState,
            instance.data,
            instance.ctx
          );
        } finally {
          setCurrentRenderingInstance(prev);
        }
      } else if (instance.render && instance.render !== shared.NOOP) {
        renderVNode(
          push,
          instance.subTree = renderComponentRoot(instance),
          instance,
          slotScopeId
        );
      } else {
        const componentName = comp.name || comp.__file || `<Anonymous>`;
        Vue.warn(`Component ${componentName} is missing template or render function.`);
        push(`<!---->`);
      }
    }
    return getBuffer();
  }
  function renderVNode(push, vnode, parentComponent, slotScopeId) {
    const { type, shapeFlag, children, dirs, props } = vnode;
    if (dirs) {
      vnode.props = applySSRDirectives(vnode, props, dirs);
    }
    switch (type) {
      case Vue.Text:
        push(shared.escapeHtml(children));
        break;
      case Vue.Comment:
        push(
          children ? `<!--${shared.escapeHtmlComment(children)}-->` : `<!---->`
        );
        break;
      case Vue.Static:
        push(children);
        break;
      case Vue.Fragment:
        if (vnode.slotScopeIds) {
          slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
        }
        push(`<!--[-->`);
        renderVNodeChildren(
          push,
          children,
          parentComponent,
          slotScopeId
        );
        push(`<!--]-->`);
        break;
      default:
        if (shapeFlag & 1) {
          renderElementVNode(push, vnode, parentComponent, slotScopeId);
        } else if (shapeFlag & 6) {
          push(renderComponentVNode(vnode, parentComponent, slotScopeId));
        } else if (shapeFlag & 64) {
          renderTeleportVNode(push, vnode, parentComponent, slotScopeId);
        } else if (shapeFlag & 128) {
          renderVNode(push, vnode.ssContent, parentComponent, slotScopeId);
        } else {
          Vue.warn(
            "[@vue/server-renderer] Invalid VNode type:",
            type,
            `(${typeof type})`
          );
        }
    }
  }
  function renderVNodeChildren(push, children, parentComponent, slotScopeId) {
    for (let i2 = 0; i2 < children.length; i2++) {
      renderVNode(push, normalizeVNode(children[i2]), parentComponent, slotScopeId);
    }
  }
  function renderElementVNode(push, vnode, parentComponent, slotScopeId) {
    const tag = vnode.type;
    let { props, children, shapeFlag, scopeId } = vnode;
    let openTag = `<${tag}`;
    if (props) {
      openTag += ssrRenderAttrs(props, tag);
    }
    if (scopeId) {
      openTag += ` ${scopeId}`;
    }
    let curParent = parentComponent;
    let curVnode = vnode;
    while (curParent && curVnode === curParent.subTree) {
      curVnode = curParent.vnode;
      if (curVnode.scopeId) {
        openTag += ` ${curVnode.scopeId}`;
      }
      curParent = curParent.parent;
    }
    if (slotScopeId) {
      openTag += ` ${slotScopeId}`;
    }
    push(openTag + `>`);
    if (!shared.isVoidTag(tag)) {
      let hasChildrenOverride = false;
      if (props) {
        if (props.innerHTML) {
          hasChildrenOverride = true;
          push(props.innerHTML);
        } else if (props.textContent) {
          hasChildrenOverride = true;
          push(shared.escapeHtml(props.textContent));
        } else if (tag === "textarea" && props.value) {
          hasChildrenOverride = true;
          push(shared.escapeHtml(props.value));
        }
      }
      if (!hasChildrenOverride) {
        if (shapeFlag & 8) {
          push(shared.escapeHtml(children));
        } else if (shapeFlag & 16) {
          renderVNodeChildren(
            push,
            children,
            parentComponent,
            slotScopeId
          );
        }
      }
      push(`</${tag}>`);
    }
  }
  function applySSRDirectives(vnode, rawProps, dirs) {
    const toMerge = [];
    for (let i2 = 0; i2 < dirs.length; i2++) {
      const binding = dirs[i2];
      const {
        dir: { getSSRProps }
      } = binding;
      if (getSSRProps) {
        const props = getSSRProps(binding, vnode);
        if (props) toMerge.push(props);
      }
    }
    return Vue.mergeProps(rawProps || {}, ...toMerge);
  }
  function renderTeleportVNode(push, vnode, parentComponent, slotScopeId) {
    const target = vnode.props && vnode.props.to;
    const disabled = vnode.props && vnode.props.disabled;
    if (!target) {
      if (!disabled) {
        Vue.warn(`[@vue/server-renderer] Teleport is missing target prop.`);
      }
      return [];
    }
    if (!shared.isString(target)) {
      Vue.warn(
        `[@vue/server-renderer] Teleport target must be a query selector string.`
      );
      return [];
    }
    ssrRenderTeleport(
      push,
      (push2) => {
        renderVNodeChildren(
          push2,
          vnode.children,
          parentComponent,
          slotScopeId
        );
      },
      target,
      disabled || disabled === "",
      parentComponent
    );
  }
  const { isVNode: isVNode$1 } = Vue.ssrUtils;
  function nestedUnrollBuffer(buffer, parentRet, startIndex) {
    if (!buffer.hasAsync) {
      return parentRet + unrollBufferSync$1(buffer);
    }
    let ret = parentRet;
    for (let i2 = startIndex; i2 < buffer.length; i2 += 1) {
      const item = buffer[i2];
      if (shared.isString(item)) {
        ret += item;
        continue;
      }
      if (shared.isPromise(item)) {
        return item.then((nestedItem) => {
          buffer[i2] = nestedItem;
          return nestedUnrollBuffer(buffer, ret, i2);
        });
      }
      const result = nestedUnrollBuffer(item, ret, 0);
      if (shared.isPromise(result)) {
        return result.then((nestedItem) => {
          buffer[i2] = nestedItem;
          return nestedUnrollBuffer(buffer, "", i2);
        });
      }
      ret = result;
    }
    return ret;
  }
  function unrollBuffer$1(buffer) {
    return nestedUnrollBuffer(buffer, "", 0);
  }
  function unrollBufferSync$1(buffer) {
    let ret = "";
    for (let i2 = 0; i2 < buffer.length; i2++) {
      let item = buffer[i2];
      if (shared.isString(item)) {
        ret += item;
      } else {
        ret += unrollBufferSync$1(item);
      }
    }
    return ret;
  }
  async function renderToString(input, context = {}) {
    if (isVNode$1(input)) {
      return renderToString(Vue.createApp({ render: () => input }), context);
    }
    const vnode = Vue.createVNode(input._component, input._props);
    vnode.appContext = input._context;
    input.provide(Vue.ssrContextKey, context);
    const buffer = await renderComponentVNode(vnode);
    const result = await unrollBuffer$1(buffer);
    await resolveTeleports(context);
    if (context.__watcherHandles) {
      for (const unwatch of context.__watcherHandles) {
        unwatch();
      }
    }
    return result;
  }
  async function resolveTeleports(context) {
    if (context.__teleportBuffers) {
      context.teleports = context.teleports || {};
      for (const key2 in context.__teleportBuffers) {
        context.teleports[key2] = await unrollBuffer$1(
          await Promise.all([context.__teleportBuffers[key2]])
        );
      }
    }
  }
  const { isVNode } = Vue.ssrUtils;
  async function unrollBuffer(buffer, stream) {
    if (buffer.hasAsync) {
      for (let i2 = 0; i2 < buffer.length; i2++) {
        let item = buffer[i2];
        if (shared.isPromise(item)) {
          item = await item;
        }
        if (shared.isString(item)) {
          stream.push(item);
        } else {
          await unrollBuffer(item, stream);
        }
      }
    } else {
      unrollBufferSync(buffer, stream);
    }
  }
  function unrollBufferSync(buffer, stream) {
    for (let i2 = 0; i2 < buffer.length; i2++) {
      let item = buffer[i2];
      if (shared.isString(item)) {
        stream.push(item);
      } else {
        unrollBufferSync(item, stream);
      }
    }
  }
  function renderToSimpleStream(input, context, stream) {
    if (isVNode(input)) {
      return renderToSimpleStream(
        Vue.createApp({ render: () => input }),
        context,
        stream
      );
    }
    const vnode = Vue.createVNode(input._component, input._props);
    vnode.appContext = input._context;
    input.provide(Vue.ssrContextKey, context);
    Promise.resolve(renderComponentVNode(vnode)).then((buffer) => unrollBuffer(buffer, stream)).then(() => resolveTeleports(context)).then(() => {
      if (context.__watcherHandles) {
        for (const unwatch of context.__watcherHandles) {
          unwatch();
        }
      }
    }).then(() => stream.push(null)).catch((error) => {
      stream.destroy(error);
    });
    return stream;
  }
  function renderToStream(input, context = {}) {
    console.warn(
      `[@vue/server-renderer] renderToStream is deprecated - use renderToNodeStream instead.`
    );
    return renderToNodeStream(input, context);
  }
  function renderToNodeStream(input, context = {}) {
    const stream = new require$$3.Readable({ read() {
    } });
    if (!stream) {
      throw new Error(
        `ESM build of renderToStream() does not support renderToNodeStream(). Use pipeToNodeWritable() with an existing Node.js Writable stream instance instead.`
      );
    }
    return renderToSimpleStream(input, context, stream);
  }
  function pipeToNodeWritable(input, context = {}, writable) {
    renderToSimpleStream(input, context, {
      push(content) {
        if (content != null) {
          writable.write(content);
        } else {
          writable.end();
        }
      },
      destroy(err) {
        writable.destroy(err);
      }
    });
  }
  function renderToWebStream(input, context = {}) {
    if (typeof ReadableStream !== "function") {
      throw new Error(
        `ReadableStream constructor is not available in the global scope. If the target environment does support web streams, consider using pipeToWebWritable() with an existing WritableStream instance instead.`
      );
    }
    const encoder = new TextEncoder();
    let cancelled = false;
    return new ReadableStream({
      start(controller) {
        renderToSimpleStream(input, context, {
          push(content) {
            if (cancelled) return;
            if (content != null) {
              controller.enqueue(encoder.encode(content));
            } else {
              controller.close();
            }
          },
          destroy(err) {
            controller.error(err);
          }
        });
      },
      cancel() {
        cancelled = true;
      }
    });
  }
  function pipeToWebWritable(input, context = {}, writable) {
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    let hasReady = false;
    try {
      hasReady = shared.isPromise(writer.ready);
    } catch (e2) {
    }
    renderToSimpleStream(input, context, {
      async push(content) {
        if (hasReady) {
          await writer.ready;
        }
        if (content != null) {
          return writer.write(encoder.encode(content));
        } else {
          return writer.close();
        }
      },
      destroy(err) {
        console.log(err);
        writer.close();
      }
    });
  }
  Vue.initDirectivesForSSR();
  serverRenderer_cjs_prod.ssrIncludeBooleanAttr = shared.includeBooleanAttr;
  serverRenderer_cjs_prod.pipeToNodeWritable = pipeToNodeWritable;
  serverRenderer_cjs_prod.pipeToWebWritable = pipeToWebWritable;
  serverRenderer_cjs_prod.renderToNodeStream = renderToNodeStream;
  serverRenderer_cjs_prod.renderToSimpleStream = renderToSimpleStream;
  serverRenderer_cjs_prod.renderToStream = renderToStream;
  serverRenderer_cjs_prod.renderToString = renderToString;
  serverRenderer_cjs_prod.renderToWebStream = renderToWebStream;
  serverRenderer_cjs_prod.ssrGetDirectiveProps = ssrGetDirectiveProps;
  serverRenderer_cjs_prod.ssrGetDynamicModelProps = ssrGetDynamicModelProps;
  serverRenderer_cjs_prod.ssrInterpolate = ssrInterpolate;
  serverRenderer_cjs_prod.ssrLooseContain = ssrLooseContain;
  serverRenderer_cjs_prod.ssrLooseEqual = ssrLooseEqual;
  serverRenderer_cjs_prod.ssrRenderAttr = ssrRenderAttr;
  serverRenderer_cjs_prod.ssrRenderAttrs = ssrRenderAttrs;
  serverRenderer_cjs_prod.ssrRenderClass = ssrRenderClass;
  serverRenderer_cjs_prod.ssrRenderComponent = ssrRenderComponent;
  serverRenderer_cjs_prod.ssrRenderDynamicAttr = ssrRenderDynamicAttr;
  serverRenderer_cjs_prod.ssrRenderDynamicModel = ssrRenderDynamicModel;
  serverRenderer_cjs_prod.ssrRenderList = ssrRenderList;
  serverRenderer_cjs_prod.ssrRenderSlot = ssrRenderSlot;
  serverRenderer_cjs_prod.ssrRenderSlotInner = ssrRenderSlotInner;
  serverRenderer_cjs_prod.ssrRenderStyle = ssrRenderStyle;
  serverRenderer_cjs_prod.ssrRenderSuspense = ssrRenderSuspense;
  serverRenderer_cjs_prod.ssrRenderTeleport = ssrRenderTeleport;
  serverRenderer_cjs_prod.ssrRenderVNode = renderVNode;
  return serverRenderer_cjs_prod;
}
var serverRenderer_cjs_prodExports = requireServerRenderer_cjs_prod();
var remember = {
  created() {
    if (!this.$options.remember) {
      return;
    }
    if (Array.isArray(this.$options.remember)) {
      this.$options.remember = { data: this.$options.remember };
    }
    if (typeof this.$options.remember === "string") {
      this.$options.remember = { data: [this.$options.remember] };
    }
    if (typeof this.$options.remember.data === "string") {
      this.$options.remember = { data: [this.$options.remember.data] };
    }
    const rememberKey = this.$options.remember.key instanceof Function ? this.$options.remember.key.call(this) : this.$options.remember.key;
    const restored = router.restore(rememberKey);
    const rememberable = this.$options.remember.data.filter((key2) => {
      return !(this[key2] !== null && typeof this[key2] === "object" && this[key2].__rememberable === false);
    });
    const hasCallbacks = (key2) => {
      return this[key2] !== null && typeof this[key2] === "object" && typeof this[key2].__remember === "function" && typeof this[key2].__restore === "function";
    };
    rememberable.forEach((key2) => {
      if (this[key2] !== void 0 && restored !== void 0 && restored[key2] !== void 0) {
        hasCallbacks(key2) ? this[key2].__restore(restored[key2]) : this[key2] = restored[key2];
      }
      this.$watch(
        key2,
        () => {
          router.remember(
            rememberable.reduce(
              (data, key3) => ({
                ...data,
                [key3]: cloneDeep(hasCallbacks(key3) ? this[key3].__remember() : this[key3])
              }),
              {}
            ),
            rememberKey
          );
        },
        { immediate: true, deep: true }
      );
    });
  }
};
var remember_default = remember;
var reservedFormKeys = null;
var bootstrapping = false;
function validateFormDataKeys(data) {
  if (bootstrapping) {
    return;
  }
  if (reservedFormKeys === null) {
    bootstrapping = true;
    reservedFormKeys = new Set(Object.keys(useForm({})));
    bootstrapping = false;
  }
  const conflicts = Object.keys(data).filter((key2) => reservedFormKeys.has(key2));
  if (conflicts.length > 0) {
    console.error(
      `[Inertia] useForm() data contains field(s) that conflict with form properties: ${conflicts.map((k2) => `"${k2}"`).join(", ")}. These fields will be overwritten by form methods/properties. Please rename these fields.`
    );
  }
}
function useForm(...args) {
  let { rememberKey, data, precognitionEndpoint } = UseFormUtils.parseUseFormArguments(...args);
  const restored = rememberKey ? router.restore(rememberKey) : null;
  let defaults2 = typeof data === "function" ? cloneDeep(data()) : cloneDeep(data);
  validateFormDataKeys(defaults2);
  let cancelToken = null;
  let recentlySuccessfulTimeoutId;
  let transform = (data2) => data2;
  let validatorRef = null;
  let rememberExcludeKeys = [];
  let defaultsCalledInOnSuccess = false;
  const form = reactive({
    ...restored ? restored.data : cloneDeep(defaults2),
    isDirty: false,
    errors: restored ? restored.errors : {},
    hasErrors: false,
    processing: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    withPrecognition(...args2) {
      precognitionEndpoint = UseFormUtils.createWayfinderCallback(...args2);
      const formWithPrecognition = this;
      let withAllErrors = null;
      const validator = createValidator((client) => {
        const { method, url } = precognitionEndpoint();
        const transformedData = cloneDeep(transform(this.data()));
        return client[method](url, transformedData);
      }, cloneDeep(defaults2));
      validatorRef = validator;
      validator.on("validatingChanged", () => {
        formWithPrecognition.validating = validator.validating();
      }).on("validatedChanged", () => {
        formWithPrecognition.__valid = validator.valid();
      }).on("touchedChanged", () => {
        formWithPrecognition.__touched = validator.touched();
      }).on("errorsChanged", () => {
        const validationErrors = withAllErrors ?? config.get("form.withAllErrors") ? validator.errors() : toSimpleValidationErrors(validator.errors());
        this.errors = {};
        this.setError(validationErrors);
        formWithPrecognition.__valid = validator.valid();
      });
      const tap = (value, callback) => {
        callback(value);
        return value;
      };
      Object.assign(formWithPrecognition, {
        __touched: [],
        __valid: [],
        validating: false,
        validator: () => validator,
        withAllErrors: () => tap(formWithPrecognition, () => withAllErrors = true),
        valid: (field) => formWithPrecognition.__valid.includes(field),
        invalid: (field) => field in this.errors,
        setValidationTimeout: (duration) => tap(formWithPrecognition, () => validator.setTimeout(duration)),
        validateFiles: () => tap(formWithPrecognition, () => validator.validateFiles()),
        withoutFileValidation: () => tap(formWithPrecognition, () => validator.withoutFileValidation()),
        touch: (field, ...fields) => {
          if (Array.isArray(field)) {
            validator.touch(field);
          } else if (typeof field === "string") {
            validator.touch([field, ...fields]);
          } else {
            validator.touch(field);
          }
          return formWithPrecognition;
        },
        touched: (field) => typeof field === "string" ? formWithPrecognition.__touched.includes(field) : formWithPrecognition.__touched.length > 0,
        validate: (field, config3) => {
          if (typeof field === "object" && !("target" in field)) {
            config3 = field;
            field = void 0;
          }
          if (field === void 0) {
            validator.validate(config3);
          } else {
            const fieldName = resolveName(field);
            const transformedData = transform(this.data());
            validator.validate(fieldName, get$3(transformedData, fieldName), config3);
          }
          return formWithPrecognition;
        },
        setErrors: (errors2) => tap(formWithPrecognition, () => this.setError(errors2)),
        forgetError: (field) => tap(
          formWithPrecognition,
          () => this.clearErrors(resolveName(field))
        )
      });
      return formWithPrecognition;
    },
    data() {
      return Object.keys(defaults2).reduce((carry, key2) => {
        return set$2(carry, key2, get$3(this, key2));
      }, {});
    },
    transform(callback) {
      transform = callback;
      return this;
    },
    defaults(fieldOrFields, maybeValue) {
      if (typeof data === "function") {
        throw new Error("You cannot call `defaults()` when using a function to define your form data.");
      }
      defaultsCalledInOnSuccess = true;
      if (typeof fieldOrFields === "undefined") {
        defaults2 = cloneDeep(this.data());
        this.isDirty = false;
      } else {
        defaults2 = typeof fieldOrFields === "string" ? set$2(cloneDeep(defaults2), fieldOrFields, maybeValue) : Object.assign({}, cloneDeep(defaults2), fieldOrFields);
      }
      validatorRef?.defaults(defaults2);
      return this;
    },
    reset(...fields) {
      const resolvedData = typeof data === "function" ? cloneDeep(data()) : cloneDeep(defaults2);
      const clonedData = cloneDeep(resolvedData);
      if (fields.length === 0) {
        defaults2 = clonedData;
        Object.assign(this, resolvedData);
      } else {
        fields.filter((key2) => has(clonedData, key2)).forEach((key2) => {
          set$2(defaults2, key2, get$3(clonedData, key2));
          set$2(this, key2, get$3(resolvedData, key2));
        });
      }
      validatorRef?.reset(...fields);
      return this;
    },
    setError(fieldOrFields, maybeValue) {
      const errors2 = typeof fieldOrFields === "string" ? { [fieldOrFields]: maybeValue } : fieldOrFields;
      Object.assign(this.errors, errors2);
      this.hasErrors = Object.keys(this.errors).length > 0;
      validatorRef?.setErrors(errors2);
      return this;
    },
    clearErrors(...fields) {
      this.errors = Object.keys(this.errors).reduce(
        (carry, field) => ({
          ...carry,
          ...fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}
        }),
        {}
      );
      this.hasErrors = Object.keys(this.errors).length > 0;
      if (validatorRef) {
        if (fields.length === 0) {
          validatorRef.setErrors({});
        } else {
          fields.forEach(validatorRef.forgetError);
        }
      }
      return this;
    },
    resetAndClearErrors(...fields) {
      this.reset(...fields);
      this.clearErrors(...fields);
      return this;
    },
    submit(...args2) {
      const { method, url, options } = UseFormUtils.parseSubmitArguments(args2, precognitionEndpoint);
      defaultsCalledInOnSuccess = false;
      const _options = {
        ...options,
        onCancelToken: (token2) => {
          cancelToken = token2;
          if (options.onCancelToken) {
            return options.onCancelToken(token2);
          }
        },
        onBefore: (visit) => {
          this.wasSuccessful = false;
          this.recentlySuccessful = false;
          clearTimeout(recentlySuccessfulTimeoutId);
          if (options.onBefore) {
            return options.onBefore(visit);
          }
        },
        onStart: (visit) => {
          this.processing = true;
          if (options.onStart) {
            return options.onStart(visit);
          }
        },
        onProgress: (event) => {
          this.progress = event ?? null;
          if (options.onProgress) {
            return options.onProgress(event);
          }
        },
        onSuccess: async (page2) => {
          this.processing = false;
          this.progress = null;
          this.clearErrors();
          this.wasSuccessful = true;
          this.recentlySuccessful = true;
          recentlySuccessfulTimeoutId = setTimeout(
            () => this.recentlySuccessful = false,
            config.get("form.recentlySuccessfulDuration")
          );
          const onSuccess = options.onSuccess ? await options.onSuccess(page2) : null;
          if (!defaultsCalledInOnSuccess) {
            defaults2 = cloneDeep(this.data());
            this.isDirty = false;
          }
          return onSuccess;
        },
        onError: (errors2) => {
          this.processing = false;
          this.progress = null;
          this.clearErrors().setError(errors2);
          if (options.onError) {
            return options.onError(errors2);
          }
        },
        onCancel: () => {
          this.processing = false;
          this.progress = null;
          if (options.onCancel) {
            return options.onCancel();
          }
        },
        onFinish: (visit) => {
          this.processing = false;
          this.progress = null;
          cancelToken = null;
          if (options.onFinish) {
            return options.onFinish(visit);
          }
        }
      };
      const transformedData = transform(this.data());
      if (method === "delete") {
        router.delete(url, { ..._options, data: transformedData });
      } else {
        router[method](url, transformedData, _options);
      }
    },
    get(url, options) {
      this.submit("get", url, options);
    },
    post(url, options) {
      this.submit("post", url, options);
    },
    put(url, options) {
      this.submit("put", url, options);
    },
    patch(url, options) {
      this.submit("patch", url, options);
    },
    delete(url, options) {
      this.submit("delete", url, options);
    },
    cancel() {
      if (cancelToken) {
        cancelToken.cancel();
      }
    },
    dontRemember(...keys2) {
      rememberExcludeKeys = keys2;
      return this;
    },
    __rememberable: rememberKey === null,
    __remember() {
      const data2 = this.data();
      if (rememberExcludeKeys.length > 0) {
        const filtered = { ...data2 };
        rememberExcludeKeys.forEach((k2) => delete filtered[k2]);
        return { data: filtered, errors: this.errors };
      }
      return { data: data2, errors: this.errors };
    },
    __restore(restored2) {
      Object.assign(this, restored2.data);
      this.setError(restored2.errors);
    }
  });
  const typedForm = form;
  watch(
    typedForm,
    (newValue) => {
      typedForm.isDirty = !isEqual(typedForm.data(), defaults2);
      const storedData = router.restore(rememberKey);
      const newData = cloneDeep(newValue.__remember());
      if (rememberKey && !isEqual(storedData, newData)) {
        router.remember(newData, rememberKey);
      }
    },
    { immediate: true, deep: true }
  );
  return precognitionEndpoint ? typedForm.withPrecognition(precognitionEndpoint) : typedForm;
}
var component = ref(void 0);
var page = ref();
var layout = shallowRef(null);
var key = ref(void 0);
var headManager;
var App = defineComponent({
  name: "Inertia",
  props: {
    initialPage: {
      type: Object,
      required: true
    },
    initialComponent: {
      type: Object,
      required: false
    },
    resolveComponent: {
      type: Function,
      required: false
    },
    titleCallback: {
      type: Function,
      required: false,
      default: (title) => title
    },
    onHeadUpdate: {
      type: Function,
      required: false,
      default: () => () => {
      }
    }
  },
  setup({ initialPage, initialComponent, resolveComponent: resolveComponent2, titleCallback, onHeadUpdate }) {
    component.value = initialComponent ? markRaw(initialComponent) : void 0;
    page.value = { ...initialPage, flash: initialPage.flash ?? {} };
    key.value = void 0;
    const isServer2 = typeof window === "undefined";
    headManager = createHeadManager(isServer2, titleCallback || ((title) => title), onHeadUpdate || (() => {
    }));
    if (!isServer2) {
      router.init({
        initialPage,
        resolveComponent: resolveComponent2,
        swapComponent: async (options) => {
          component.value = markRaw(options.component);
          page.value = options.page;
          key.value = options.preserveState ? key.value : Date.now();
        },
        onFlash: (flash) => {
          page.value = { ...page.value, flash };
        }
      });
      router.on("navigate", () => headManager.forceUpdate());
    }
    return () => {
      if (component.value) {
        component.value.inheritAttrs = !!component.value.inheritAttrs;
        const child = h$2(component.value, {
          ...page.value.props,
          key: key.value
        });
        if (layout.value) {
          component.value.layout = layout.value;
          layout.value = null;
        }
        if (component.value.layout) {
          if (typeof component.value.layout === "function") {
            return component.value.layout(h$2, child);
          }
          return (Array.isArray(component.value.layout) ? component.value.layout : [component.value.layout]).concat(child).reverse().reduce((child2, layout2) => {
            layout2.inheritAttrs = !!layout2.inheritAttrs;
            return h$2(layout2, { ...page.value.props }, () => child2);
          });
        }
        return child;
      }
    };
  }
});
var app_default = App;
var plugin = {
  install(app) {
    router.form = useForm;
    Object.defineProperty(app.config.globalProperties, "$inertia", { get: () => router });
    Object.defineProperty(app.config.globalProperties, "$page", { get: () => page.value });
    Object.defineProperty(app.config.globalProperties, "$headManager", { get: () => headManager });
    app.mixin(remember_default);
  }
};
function usePage() {
  return reactive({
    props: computed(() => page.value?.props),
    url: computed(() => page.value?.url),
    component: computed(() => page.value?.component),
    version: computed(() => page.value?.version),
    clearHistory: computed(() => page.value?.clearHistory),
    deferredProps: computed(() => page.value?.deferredProps),
    mergeProps: computed(() => page.value?.mergeProps),
    prependProps: computed(() => page.value?.prependProps),
    deepMergeProps: computed(() => page.value?.deepMergeProps),
    matchPropsOn: computed(() => page.value?.matchPropsOn),
    rememberedState: computed(() => page.value?.rememberedState),
    encryptHistory: computed(() => page.value?.encryptHistory),
    flash: computed(() => page.value?.flash)
  });
}
async function createInertiaApp({
  id = "app",
  resolve,
  setup,
  title,
  progress: progress2 = {},
  page: page2,
  render,
  defaults: defaults2 = {}
}) {
  config.replace(defaults2);
  const isServer2 = typeof window === "undefined";
  const useScriptElementForInitialPage = config.get("future.useScriptElementForInitialPage");
  const initialPage = page2 || getInitialPageFromDOM(id, useScriptElementForInitialPage);
  const resolveComponent2 = (name2) => Promise.resolve(resolve(name2)).then((module2) => module2.default || module2);
  let head = [];
  const vueApp = await Promise.all([
    resolveComponent2(initialPage.component),
    router.decryptHistory().catch(() => {
    })
  ]).then(([initialComponent]) => {
    const props = {
      initialPage,
      initialComponent,
      resolveComponent: resolveComponent2,
      titleCallback: title
    };
    if (isServer2) {
      const ssrSetup = setup;
      return ssrSetup({
        el: null,
        App: app_default,
        props: { ...props, onHeadUpdate: (elements) => head = elements },
        plugin
      });
    }
    const csrSetup = setup;
    return csrSetup({
      el: document.getElementById(id),
      App: app_default,
      props,
      plugin
    });
  });
  if (!isServer2 && progress2) {
    setupProgress(progress2);
  }
  if (isServer2 && render) {
    const element = () => {
      if (!useScriptElementForInitialPage) {
        return h$2("div", {
          id,
          "data-page": JSON.stringify(initialPage),
          innerHTML: vueApp ? render(vueApp) : ""
        });
      }
      return [
        h$2("script", {
          "data-page": id,
          type: "application/json",
          innerHTML: JSON.stringify(initialPage).replace(/\//g, "\\/")
        }),
        h$2("div", {
          id,
          innerHTML: vueApp ? render(vueApp) : ""
        })
      ];
    };
    const body = await render(
      createSSRApp({
        render: () => element()
      })
    );
    return { head, body };
  }
}
defineComponent({
  name: "Deferred",
  props: {
    data: {
      type: [String, Array],
      required: true
    }
  },
  render() {
    const keys2 = Array.isArray(this.$props.data) ? this.$props.data : [this.$props.data];
    if (!this.$slots.fallback) {
      throw new Error("`<Deferred>` requires a `<template #fallback>` slot");
    }
    return keys2.every((key2) => this.$page.props[key2] !== void 0) ? this.$slots.default?.() : this.$slots.fallback();
  }
});
var noop = () => void 0;
var FormContextKey = /* @__PURE__ */ Symbol("InertiaFormContext");
defineComponent({
  name: "Form",
  slots: Object,
  props: {
    action: {
      type: [String, Object],
      default: ""
    },
    method: {
      type: String,
      default: "get"
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    errorBag: {
      type: [String, null],
      default: null
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    transform: {
      type: Function,
      default: (data) => data
    },
    options: {
      type: Object,
      default: () => ({})
    },
    resetOnError: {
      type: [Boolean, Array],
      default: false
    },
    resetOnSuccess: {
      type: [Boolean, Array],
      default: false
    },
    setDefaultsOnSuccess: {
      type: Boolean,
      default: false
    },
    onCancelToken: {
      type: Function,
      default: noop
    },
    onBefore: {
      type: Function,
      default: noop
    },
    onStart: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onFinish: {
      type: Function,
      default: noop
    },
    onCancel: {
      type: Function,
      default: noop
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    onSubmitComplete: {
      type: Function,
      default: noop
    },
    disableWhileProcessing: {
      type: Boolean,
      default: false
    },
    invalidateCacheTags: {
      type: [String, Array],
      default: () => []
    },
    validateFiles: {
      type: Boolean,
      default: false
    },
    validationTimeout: {
      type: Number,
      default: 1500
    },
    withAllErrors: {
      type: Boolean,
      default: null
    }
  },
  setup(props, { slots, attrs, expose }) {
    const getTransformedData = () => {
      const [_url, data] = getUrlAndData();
      return props.transform(data);
    };
    const form = useForm({}).withPrecognition(
      () => method.value,
      () => getUrlAndData()[0]
    ).transform(getTransformedData).setValidationTimeout(props.validationTimeout);
    if (props.validateFiles) {
      form.validateFiles();
    }
    if (props.withAllErrors ?? config$1.get("form.withAllErrors")) {
      form.withAllErrors();
    }
    const formElement = ref();
    const method = computed(
      () => isUrlMethodPair(props.action) ? props.action.method : props.method.toLowerCase()
    );
    const isDirty = ref(false);
    const defaultData = ref(new FormData());
    const onFormUpdate = (event) => {
      if (event.type === "reset" && event.detail?.[FormComponentResetSymbol]) {
        event.preventDefault();
      }
      isDirty.value = event.type === "reset" ? false : !isEqual(getData(), formDataToObject(defaultData.value));
    };
    const formEvents = ["input", "change", "reset"];
    onMounted(() => {
      defaultData.value = getFormData();
      form.defaults(getData());
      formEvents.forEach((e2) => formElement.value.addEventListener(e2, onFormUpdate));
    });
    watch(
      () => props.validateFiles,
      (value) => value ? form.validateFiles() : form.withoutFileValidation()
    );
    watch(
      () => props.validationTimeout,
      (value) => form.setValidationTimeout(value)
    );
    onBeforeUnmount(() => formEvents.forEach((e2) => formElement.value?.removeEventListener(e2, onFormUpdate)));
    const getFormData = (submitter) => new FormData(formElement.value, submitter);
    const getData = (submitter) => formDataToObject(getFormData(submitter));
    const getUrlAndData = (submitter) => {
      return mergeDataIntoQueryString(
        method.value,
        isUrlMethodPair(props.action) ? props.action.url : props.action,
        getData(submitter),
        props.queryStringArrayFormat
      );
    };
    const submit = (submitter) => {
      const [url, data] = getUrlAndData(submitter);
      const formTarget = submitter?.getAttribute("formtarget");
      if (formTarget === "_blank" && method.value === "get") {
        window.open(url, "_blank");
        return;
      }
      const maybeReset = (resetOption) => {
        if (!resetOption) {
          return;
        }
        if (resetOption === true) {
          reset();
        } else if (resetOption.length > 0) {
          reset(...resetOption);
        }
      };
      const submitOptions = {
        headers: props.headers,
        queryStringArrayFormat: props.queryStringArrayFormat,
        errorBag: props.errorBag,
        showProgress: props.showProgress,
        invalidateCacheTags: props.invalidateCacheTags,
        onCancelToken: props.onCancelToken,
        onBefore: props.onBefore,
        onStart: props.onStart,
        onProgress: props.onProgress,
        onFinish: props.onFinish,
        onCancel: props.onCancel,
        onSuccess: (...args) => {
          props.onSuccess?.(...args);
          props.onSubmitComplete?.(exposed);
          maybeReset(props.resetOnSuccess);
          if (props.setDefaultsOnSuccess === true) {
            defaults2();
          }
        },
        onError: (...args) => {
          props.onError?.(...args);
          maybeReset(props.resetOnError);
        },
        ...props.options
      };
      form.transform(() => props.transform(data)).submit(method.value, url, submitOptions);
      form.transform(getTransformedData);
    };
    const reset = (...fields) => {
      resetFormFields(formElement.value, defaultData.value, fields);
      form.reset(...fields);
    };
    const clearErrors = (...fields) => {
      form.clearErrors(...fields);
    };
    const resetAndClearErrors = (...fields) => {
      clearErrors(...fields);
      reset(...fields);
    };
    const defaults2 = () => {
      defaultData.value = getFormData();
      isDirty.value = false;
    };
    const exposed = {
      get errors() {
        return form.errors;
      },
      get hasErrors() {
        return form.hasErrors;
      },
      get processing() {
        return form.processing;
      },
      get progress() {
        return form.progress;
      },
      get wasSuccessful() {
        return form.wasSuccessful;
      },
      get recentlySuccessful() {
        return form.recentlySuccessful;
      },
      get validating() {
        return form.validating;
      },
      clearErrors,
      resetAndClearErrors,
      setError: (fieldOrFields, maybeValue) => form.setError(typeof fieldOrFields === "string" ? { [fieldOrFields]: maybeValue } : fieldOrFields),
      get isDirty() {
        return isDirty.value;
      },
      reset,
      submit,
      defaults: defaults2,
      getData,
      getFormData,
      // Precognition
      touch: form.touch,
      valid: form.valid,
      invalid: form.invalid,
      touched: form.touched,
      validate: (field, config3) => form.validate(...UseFormUtils.mergeHeadersForValidation(field, config3, props.headers)),
      validator: () => form.validator()
    };
    expose(exposed);
    provide(FormContextKey, exposed);
    return () => {
      return h$2(
        "form",
        {
          ...attrs,
          ref: formElement,
          action: isUrlMethodPair(props.action) ? props.action.url : props.action,
          method: method.value,
          onSubmit: (event) => {
            event.preventDefault();
            submit(event.submitter);
          },
          inert: props.disableWhileProcessing && form.processing
        },
        slots.default ? slots.default(exposed) : []
      );
    };
  }
});
var Head = defineComponent({
  props: {
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      provider: this.$headManager.createProvider()
    };
  },
  beforeUnmount() {
    this.provider.disconnect();
  },
  methods: {
    isUnaryTag(node) {
      return typeof node.type === "string" && [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ].indexOf(node.type) > -1;
    },
    renderTagStart(node) {
      node.props = node.props || {};
      node.props[this.provider.preferredAttribute()] = node.props["head-key"] !== void 0 ? node.props["head-key"] : "";
      const attrs = Object.keys(node.props).reduce((carry, name2) => {
        const value = String(node.props[name2]);
        if (["key", "head-key"].includes(name2)) {
          return carry;
        } else if (value === "") {
          return carry + ` ${name2}`;
        } else {
          return carry + ` ${name2}="${escape$1(value)}"`;
        }
      }, "");
      return `<${String(node.type)}${attrs}>`;
    },
    renderTagChildren(node) {
      const { children } = node;
      if (typeof children === "string") {
        return children;
      }
      if (Array.isArray(children)) {
        return children.reduce((html, child) => {
          return html + this.renderTag(child);
        }, "");
      }
      return "";
    },
    isFunctionNode(node) {
      return typeof node.type === "function";
    },
    isComponentNode(node) {
      return typeof node.type === "object";
    },
    isCommentNode(node) {
      return /(comment|cmt)/i.test(node.type.toString());
    },
    isFragmentNode(node) {
      return /(fragment|fgt|symbol\(\))/i.test(node.type.toString());
    },
    isTextNode(node) {
      return /(text|txt)/i.test(node.type.toString());
    },
    renderTag(node) {
      if (this.isTextNode(node)) {
        return String(node.children);
      } else if (this.isFragmentNode(node)) {
        return "";
      } else if (this.isCommentNode(node)) {
        return "";
      }
      let html = this.renderTagStart(node);
      if (node.children) {
        html += this.renderTagChildren(node);
      }
      if (!this.isUnaryTag(node)) {
        html += `</${String(node.type)}>`;
      }
      return html;
    },
    addTitleElement(elements) {
      if (this.title && !elements.find((tag) => tag.startsWith("<title"))) {
        elements.push(`<title ${this.provider.preferredAttribute()}>${this.title}</title>`);
      }
      return elements;
    },
    renderNodes(nodes) {
      const elements = nodes.flatMap((node) => this.resolveNode(node)).map((node) => this.renderTag(node)).filter((node) => node);
      return this.addTitleElement(elements);
    },
    resolveNode(node) {
      if (this.isFunctionNode(node)) {
        return this.resolveNode(node.type());
      } else if (this.isComponentNode(node)) {
        console.warn(`Using components in the <Head> component is not supported.`);
        return [];
      } else if (this.isTextNode(node) && node.children) {
        return node;
      } else if (this.isFragmentNode(node) && node.children) {
        return node.children.flatMap((child) => this.resolveNode(child));
      } else if (this.isCommentNode(node)) {
        return [];
      } else {
        return node;
      }
    }
  },
  render() {
    this.provider.update(this.renderNodes(this.$slots.default ? this.$slots.default() : []));
  }
});
var head_default = Head;
var resolveHTMLElement = (value, fallback) => {
  if (!value) {
    return fallback;
  }
  if (typeof value === "string") {
    return document.querySelector(value);
  }
  if (typeof value === "function") {
    return value() || null;
  }
  return fallback;
};
defineComponent({
  name: "InfiniteScroll",
  slots: Object,
  props: {
    data: {
      type: String,
      required: true
    },
    buffer: {
      type: Number,
      default: 0
    },
    onlyNext: {
      type: Boolean,
      default: false
    },
    onlyPrevious: {
      type: Boolean,
      default: false
    },
    as: {
      type: String,
      default: "div"
    },
    manual: {
      type: Boolean,
      default: false
    },
    manualAfter: {
      type: Number,
      default: 0
    },
    preserveUrl: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: void 0
    },
    itemsElement: {
      type: [String, Function, Object],
      default: null
    },
    startElement: {
      type: [String, Function, Object],
      default: null
    },
    endElement: {
      type: [String, Function, Object],
      default: null
    }
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, expose }) {
    const itemsElementRef = ref(null);
    const startElementRef = ref(null);
    const endElementRef = ref(null);
    const itemsElement = computed(
      () => resolveHTMLElement(props.itemsElement, itemsElementRef.value)
    );
    const scrollableParent = computed(() => getScrollableParent(itemsElement.value));
    const startElement = computed(
      () => resolveHTMLElement(props.startElement, startElementRef.value)
    );
    const endElement = computed(() => resolveHTMLElement(props.endElement, endElementRef.value));
    const loadingPrevious = ref(false);
    const loadingNext = ref(false);
    const requestCount = ref(0);
    const hasPreviousPage = ref(false);
    const hasNextPage = ref(false);
    const syncStateFromDataManager = () => {
      requestCount.value = dataManager.getRequestCount();
      hasPreviousPage.value = dataManager.hasPrevious();
      hasNextPage.value = dataManager.hasNext();
    };
    const {
      dataManager,
      elementManager,
      flush: flushInfiniteScroll
    } = useInfiniteScroll({
      // Data
      getPropName: () => props.data,
      inReverseMode: () => props.reverse,
      shouldFetchNext: () => !props.onlyPrevious,
      shouldFetchPrevious: () => !props.onlyNext,
      shouldPreserveUrl: () => props.preserveUrl,
      // Elements
      getTriggerMargin: () => props.buffer,
      getStartElement: () => startElement.value,
      getEndElement: () => endElement.value,
      getItemsElement: () => itemsElement.value,
      getScrollableParent: () => scrollableParent.value,
      // Request callbacks
      onBeforePreviousRequest: () => loadingPrevious.value = true,
      onBeforeNextRequest: () => loadingNext.value = true,
      onCompletePreviousRequest: () => {
        loadingPrevious.value = false;
        syncStateFromDataManager();
      },
      onCompleteNextRequest: () => {
        loadingNext.value = false;
        syncStateFromDataManager();
      },
      onDataReset: syncStateFromDataManager
    });
    syncStateFromDataManager();
    const autoLoad = computed(() => !manualMode.value);
    const manualMode = computed(
      () => props.manual || props.manualAfter > 0 && requestCount.value >= props.manualAfter
    );
    const scrollToBottom = () => {
      if (scrollableParent.value) {
        scrollableParent.value.scrollTo({
          top: scrollableParent.value.scrollHeight,
          behavior: "instant"
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant"
        });
      }
    };
    onMounted(() => {
      elementManager.setupObservers();
      elementManager.processServerLoadedElements(dataManager.getLastLoadedPage());
      const shouldAutoScroll = props.autoScroll !== void 0 ? props.autoScroll : props.reverse;
      if (shouldAutoScroll) {
        scrollToBottom();
      }
      if (autoLoad.value) {
        elementManager.enableTriggers();
      }
    });
    onUnmounted(flushInfiniteScroll);
    watch(
      () => [autoLoad.value, props.onlyNext, props.onlyPrevious],
      ([enabled]) => {
        enabled ? elementManager.enableTriggers() : elementManager.disableTriggers();
      }
    );
    expose({
      fetchNext: dataManager.fetchNext,
      fetchPrevious: dataManager.fetchPrevious,
      hasPrevious: dataManager.hasPrevious,
      hasNext: dataManager.hasNext
    });
    return () => {
      const renderElements = [];
      const sharedExposed = {
        loadingPrevious: loadingPrevious.value,
        loadingNext: loadingNext.value,
        hasPrevious: hasPreviousPage.value,
        hasNext: hasNextPage.value
      };
      if (!props.startElement) {
        const headerAutoMode = autoLoad.value && !props.onlyNext;
        const exposedPrevious = {
          loading: loadingPrevious.value,
          fetch: dataManager.fetchPrevious,
          autoMode: headerAutoMode,
          manualMode: !headerAutoMode,
          hasMore: hasPreviousPage.value,
          ...sharedExposed
        };
        renderElements.push(
          h$2(
            "div",
            { ref: startElementRef },
            slots.previous ? slots.previous(exposedPrevious) : loadingPrevious.value ? slots.loading?.(exposedPrevious) : void 0
          )
        );
      }
      renderElements.push(
        h$2(
          props.as,
          { ...attrs, ref: itemsElementRef },
          slots.default?.({
            loading: loadingPrevious.value || loadingNext.value,
            loadingPrevious: loadingPrevious.value,
            loadingNext: loadingNext.value
          })
        )
      );
      if (!props.endElement) {
        const footerAutoMode = autoLoad.value && !props.onlyPrevious;
        const exposedNext = {
          loading: loadingNext.value,
          fetch: dataManager.fetchNext,
          autoMode: footerAutoMode,
          manualMode: !footerAutoMode,
          hasMore: hasNextPage.value,
          ...sharedExposed
        };
        renderElements.push(
          h$2(
            "div",
            { ref: endElementRef },
            slots.next ? slots.next(exposedNext) : loadingNext.value ? slots.loading?.(exposedNext) : void 0
          )
        );
      }
      return h$2(Fragment, {}, props.reverse ? [...renderElements].reverse() : renderElements);
    };
  }
});
var noop2 = () => {
};
var Link = defineComponent({
  name: "Link",
  props: {
    as: {
      type: [String, Object],
      default: "a"
    },
    data: {
      type: Object,
      default: () => ({})
    },
    href: {
      type: [String, Object],
      default: ""
    },
    method: {
      type: String,
      default: "get"
    },
    replace: {
      type: Boolean,
      default: false
    },
    preserveScroll: {
      type: [Boolean, String, Function],
      default: false
    },
    preserveState: {
      type: [Boolean, String, Function],
      default: null
    },
    preserveUrl: {
      type: Boolean,
      default: false
    },
    only: {
      type: Array,
      default: () => []
    },
    except: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    queryStringArrayFormat: {
      type: String,
      default: "brackets"
    },
    async: {
      type: Boolean,
      default: false
    },
    prefetch: {
      type: [Boolean, String, Array],
      default: false
    },
    cacheFor: {
      type: [Number, String, Array],
      default: 0
    },
    onStart: {
      type: Function,
      default: noop2
    },
    onProgress: {
      type: Function,
      default: noop2
    },
    onFinish: {
      type: Function,
      default: noop2
    },
    onBefore: {
      type: Function,
      default: noop2
    },
    onCancel: {
      type: Function,
      default: noop2
    },
    onSuccess: {
      type: Function,
      default: noop2
    },
    onError: {
      type: Function,
      default: noop2
    },
    onCancelToken: {
      type: Function,
      default: noop2
    },
    onPrefetching: {
      type: Function,
      default: noop2
    },
    onPrefetched: {
      type: Function,
      default: noop2
    },
    cacheTags: {
      type: [String, Array],
      default: () => []
    },
    viewTransition: {
      type: [Boolean, Object],
      default: false
    }
  },
  setup(props, { slots, attrs }) {
    const inFlightCount = ref(0);
    const hoverTimeout = ref();
    const prefetchModes = computed(() => {
      if (props.prefetch === true) {
        return ["hover"];
      }
      if (props.prefetch === false) {
        return [];
      }
      if (Array.isArray(props.prefetch)) {
        return props.prefetch;
      }
      return [props.prefetch];
    });
    const cacheForValue = computed(() => {
      if (props.cacheFor !== 0) {
        return props.cacheFor;
      }
      if (prefetchModes.value.length === 1 && prefetchModes.value[0] === "click") {
        return 0;
      }
      return config.get("prefetch.cacheFor");
    });
    onMounted(() => {
      if (prefetchModes.value.includes("mount")) {
        prefetch();
      }
    });
    onUnmounted(() => {
      clearTimeout(hoverTimeout.value);
    });
    const method = computed(
      () => isUrlMethodPair(props.href) ? props.href.method : (props.method ?? "get").toLowerCase()
    );
    const as2 = computed(() => {
      if (typeof props.as !== "string" || props.as.toLowerCase() !== "a") {
        return props.as;
      }
      return method.value !== "get" ? "button" : props.as.toLowerCase();
    });
    const mergeDataArray = computed(
      () => mergeDataIntoQueryString(
        method.value,
        isUrlMethodPair(props.href) ? props.href.url : props.href,
        props.data || {},
        props.queryStringArrayFormat
      )
    );
    const href = computed(() => mergeDataArray.value[0]);
    const data = computed(() => mergeDataArray.value[1]);
    const elProps = computed(() => {
      if (as2.value === "button") {
        return { type: "button" };
      }
      if (as2.value === "a" || typeof as2.value !== "string") {
        return { href: href.value };
      }
      return {};
    });
    const baseParams = computed(() => ({
      data: data.value,
      method: method.value,
      replace: props.replace,
      preserveScroll: props.preserveScroll,
      preserveState: props.preserveState ?? method.value !== "get",
      preserveUrl: props.preserveUrl,
      only: props.only,
      except: props.except,
      headers: props.headers,
      async: props.async
    }));
    const visitParams = computed(() => ({
      ...baseParams.value,
      viewTransition: props.viewTransition,
      onCancelToken: props.onCancelToken,
      onBefore: props.onBefore,
      onStart: (visit) => {
        inFlightCount.value++;
        props.onStart?.(visit);
      },
      onProgress: props.onProgress,
      onFinish: (visit) => {
        inFlightCount.value--;
        props.onFinish?.(visit);
      },
      onCancel: props.onCancel,
      onSuccess: props.onSuccess,
      onError: props.onError
    }));
    const prefetch = () => {
      router.prefetch(
        href.value,
        {
          ...baseParams.value,
          onPrefetching: props.onPrefetching,
          onPrefetched: props.onPrefetched
        },
        {
          cacheFor: cacheForValue.value,
          cacheTags: props.cacheTags
        }
      );
    };
    const regularEvents = {
      onClick: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
          router.visit(href.value, visitParams.value);
        }
      }
    };
    const prefetchHoverEvents = {
      onMouseenter: () => {
        hoverTimeout.value = setTimeout(() => {
          prefetch();
        }, config.get("prefetch.hoverDelay"));
      },
      onMouseleave: () => {
        clearTimeout(hoverTimeout.value);
      },
      onClick: regularEvents.onClick
    };
    const prefetchClickEvents = {
      onMousedown: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
          prefetch();
        }
      },
      onKeydown: (event) => {
        if (shouldNavigate(event)) {
          event.preventDefault();
          prefetch();
        }
      },
      onMouseup: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
          router.visit(href.value, visitParams.value);
        }
      },
      onKeyup: (event) => {
        if (shouldNavigate(event)) {
          event.preventDefault();
          router.visit(href.value, visitParams.value);
        }
      },
      onClick: (event) => {
        if (shouldIntercept(event)) {
          event.preventDefault();
        }
      }
    };
    return () => {
      return h$2(
        as2.value,
        {
          ...attrs,
          ...elProps.value,
          "data-loading": inFlightCount.value > 0 ? "" : void 0,
          ...(() => {
            if (prefetchModes.value.includes("hover")) {
              return prefetchHoverEvents;
            }
            if (prefetchModes.value.includes("click")) {
              return prefetchClickEvents;
            }
            return regularEvents;
          })()
        },
        slots
      );
    };
  }
});
var link_default = Link;
defineComponent({
  name: "WhenVisible",
  slots: Object,
  props: {
    data: {
      type: [String, Array]
    },
    params: {
      type: Object
    },
    buffer: {
      type: Number,
      default: 0
    },
    as: {
      type: String,
      default: "div"
    },
    always: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      fetching: false,
      observer: null
    };
  },
  unmounted() {
    this.observer?.disconnect();
  },
  computed: {
    keys() {
      return this.data ? Array.isArray(this.data) ? this.data : [this.data] : [];
    }
  },
  created() {
    const page2 = usePage();
    this.$watch(
      () => this.keys.map((key2) => page2.props[key2]),
      () => {
        const exists = this.keys.length > 0 && this.keys.every((key2) => page2.props[key2] !== void 0);
        this.loaded = exists;
        if (exists && !this.always) {
          return;
        }
        if (!this.observer || !exists) {
          this.$nextTick(this.registerObserver);
        }
      },
      { immediate: true }
    );
  },
  methods: {
    registerObserver() {
      this.observer?.disconnect();
      this.observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            return;
          }
          if (this.fetching) {
            return;
          }
          if (!this.always && this.loaded) {
            return;
          }
          this.fetching = true;
          const reloadParams = this.getReloadParams();
          router.reload({
            ...reloadParams,
            onStart: (e2) => {
              this.fetching = true;
              reloadParams.onStart?.(e2);
            },
            onFinish: (e2) => {
              this.loaded = true;
              this.fetching = false;
              reloadParams.onFinish?.(e2);
              if (!this.always) {
                this.observer?.disconnect();
              }
            }
          });
        },
        {
          rootMargin: `${this.$props.buffer}px`
        }
      );
      this.observer.observe(this.$el.nextSibling);
    },
    getReloadParams() {
      const reloadParams = { ...this.$props.params };
      if (this.$props.data) {
        reloadParams.only = Array.isArray(this.$props.data) ? this.$props.data : [this.$props.data];
      }
      return reloadParams;
    }
  },
  render() {
    const els = [];
    if (this.$props.always || !this.loaded) {
      els.push(h$2(this.$props.as));
    }
    if (!this.loaded) {
      els.push(this.$slots.fallback ? this.$slots.fallback({}) : null);
    } else if (this.$slots.default) {
      els.push(this.$slots.default({ fetching: this.fetching }));
    }
    return els;
  }
});
var config = config$1.extend({});
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page2 = pages[p2];
    if (typeof page2 === "undefined") {
      continue;
    }
    return typeof page2 === "function" ? page2() : page2;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n$1 = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = /* @__PURE__ */ new WeakMap();
var l = function(t3, e2) {
  return u.set(t3, e2), t3;
};
function c$1(t3) {
  return u.has(t3);
}
var a = function(t3) {
  return u.get(t3);
}, f = function(t3, e2) {
  u.set(t3, e2);
};
const p = (function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
})(), y$1 = function(t3, e2) {
  const o2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (let e3 = 0; e3 < t3.length; ++e3) void 0 !== t3[e3] && (o2[e3] = t3[e3]);
  return o2;
}, d$1 = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      if (c$1(e2)) {
        var r2 = a(e2) + 1;
        e2[r2] = o2, f(e2, r2);
      } else (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) {
    if (c$1(o2)) {
      for (var u2 = Object.keys(o2), p2 = n2 && n2.plainObjects ? { __proto__: null, 0: e2 } : { 0: e2 }, d2 = 0; d2 < u2.length; d2++) p2[parseInt(u2[d2], 10) + 1] = o2[u2[d2]];
      return l(p2, a(o2) + 1);
    }
    return [e2].concat(o2);
  }
  let h2 = e2;
  return s(e2) && !s(o2) && (h2 = y$1(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, h2);
}, h$1 = 1024, b$1 = function(t3, e2, o2, n2) {
  if (c$1(t3)) {
    var r2 = a(t3) + 1;
    return t3[r2] = e2, f(t3, r2), t3;
  }
  var i2 = [].concat(t3, e2);
  return i2.length > o2 ? l(y$1(i2, { plainObjects: n2 }), i2.length - 1) : i2;
}, m$1 = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, g$1 = Object.prototype.hasOwnProperty, w = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, v = Array.isArray, j = Array.prototype.push, $$1 = function(t3, e2) {
  j.apply(t3, v(e2) ? e2 : [e2]);
}, E$1 = Date.prototype.toISOString, O = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += h$1) {
    const e3 = i2.length >= h$1 ? i2.slice(t4, t4 + h$1) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = p[n3] : n3 < 2048 ? o3[o3.length] = p[192 | n3 >> 6] + p[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = p[224 | n3 >> 12] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = p[240 | n3 >> 18] + p[128 | n3 >> 12 & 63] + p[128 | n3 >> 6 & 63] + p[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n$1[r], indices: false, serializeDate: function(t3) {
  return E$1.call(t3);
}, skipNulls: false, strictNullHandling: false }, T = {}, R = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, f2, p2, y2, d2, h2, b2, g2) {
  let w2 = t3, j2 = g2, E2 = 0, _2 = false;
  for (; void 0 !== (j2 = j2.get(T)) && !_2; ) {
    const e3 = j2.get(t3);
    if (E2 += 1, void 0 !== e3) {
      if (e3 === E2) throw new RangeError("Cyclic object value");
      _2 = true;
    }
    void 0 === j2.get(T) && (E2 = 0);
  }
  if ("function" == typeof c2 ? w2 = c2(e2, w2) : w2 instanceof Date ? w2 = p2(w2) : "comma" === o2 && v(w2) && (w2 = m$1(w2, function(t4) {
    return t4 instanceof Date ? p2(t4) : t4;
  })), null === w2) {
    if (i2) return l2 && !h2 ? l2(e2, O.encoder, b2, "key", y2) : e2;
    w2 = "";
  }
  if ("string" == typeof (I2 = w2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || (function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  })(w2)) return l2 ? [d2(h2 ? e2 : l2(e2, O.encoder, b2, "key", y2)) + "=" + d2(l2(w2, O.encoder, b2, "value", y2))] : [d2(e2) + "=" + d2(String(w2))];
  var I2;
  const S2 = [];
  if (void 0 === w2) return S2;
  let A2;
  if ("comma" === o2 && v(w2)) h2 && l2 && (w2 = m$1(w2, l2)), A2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (v(c2)) A2 = c2;
  else {
    const t4 = Object.keys(w2);
    A2 = a2 ? t4.sort(a2) : t4;
  }
  const D2 = u2 ? e2.replace(/\./g, "%2E") : e2, k2 = n2 && v(w2) && 1 === w2.length ? D2 + "[]" : D2;
  if (r2 && v(w2) && 0 === w2.length) return k2 + "[]";
  for (let e3 = 0; e3 < A2.length; ++e3) {
    const m2 = A2[e3], j3 = "object" == typeof m2 && void 0 !== m2.value ? m2.value : w2[m2];
    if (s2 && null === j3) continue;
    const O2 = f2 && u2 ? m2.replace(/\./g, "%2E") : m2, _3 = v(w2) ? "function" == typeof o2 ? o2(k2, O2) : k2 : k2 + (f2 ? "." + O2 : "[" + O2 + "]");
    g2.set(t3, E2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(T, g2), $$1(S2, R(j3, _3, o2, n2, r2, i2, s2, u2, "comma" === o2 && h2 && v(w2) ? null : l2, c2, a2, f2, p2, y2, d2, h2, b2, I3));
  }
  return S2;
}, _$1 = Object.prototype.hasOwnProperty, I = Array.isArray, S$1 = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, A = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, D = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, k$1 = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && _$1.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let a2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && a2 < o2.depth; ) {
    if (a2 += 1, !o2.plainObjects && _$1.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), (function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : D(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = c$1(r3) ? r3 : o3.allowEmptyArrays && ("" === r3 || o3.strictNullHandling && null === r3) ? [] : b$1([], r3, o3.arrayLimit, o3.plainObjects);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  })(l2, e2, o2, n2);
};
function N(t3, e2) {
  const o2 = /* @__PURE__ */ (function(t4) {
    return S$1;
  })();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? (function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, a2;
      -1 === l2 ? (c2 = e3.decoder(t5, S$1.decoder, s2, "key"), a2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), S$1.decoder, s2, "key"), a2 = m$1(D(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, S$1.decoder, s2, "value");
      })), a2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (a2 = A(a2)), t5.indexOf("[]=") > -1 && (a2 = I(a2) ? [a2] : a2);
      const f2 = _$1.call(o3, c2);
      f2 && "combine" === e3.duplicates ? o3[c2] = b$1(o3[c2], a2, e3.arrayLimit, e3.plainObjects) : f2 && "last" !== e3.duplicates || (o3[c2] = a2);
    }
    return o3;
  })(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = k$1(s2, n2[s2], o2, "string" == typeof t3);
    r2 = d$1(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : (function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return (function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    })(e3), t4;
  })(r2);
}
let x$1 = class x {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: N(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
};
let C$1 = class C extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x$1(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + (function(t3, e3) {
      let o2 = t3;
      const i2 = (function(t4) {
        if (!t4) return O;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || O.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!g$1.call(n$1, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n$1[o3];
        let s3, u3 = O.filter;
        if (("function" == typeof t4.filter || v(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in w ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : O.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : O.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || O.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : O.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : O.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? O.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : O.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : O.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : O.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : O.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : O.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : O.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : O.strictNullHandling };
      })(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : v(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = w[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || $$1(l2, R(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const p2 = l2.join(i2.delimiter);
      let y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), p2.length > 0 ? y2 + p2 : "";
    })(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new x$1(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new x$1(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2.hasOwnProperty(n2[0].name) || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      const s2 = i2.hasOwnProperty(o2[r2]) ? o2[r2] : i2.hasOwnProperty("id") ? "id" : void 0;
      if (void 0 === s2) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
      return t({}, e3, { [r2]: i2[s2] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
};
function P(t3, e2, o2, n2) {
  const r2 = new C$1(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const U = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => P(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
function getPluralIndex(lang2, number) {
  switch (lang2.replace("_", "-")) {
    case "af":
    case "af-ZA":
    case "bn":
    case "bn-BD":
    case "bn-IN":
    case "bg":
    case "bg-BG":
    case "ca":
    case "ca-AD":
    case "ca-ES":
    case "ca-FR":
    case "ca-IT":
    case "da":
    case "da-DK":
    case "de":
    case "de-AT":
    case "de-BE":
    case "de-CH":
    case "de-DE":
    case "de-LI":
    case "de-LU":
    case "el":
    case "el-CY":
    case "el-GR":
    case "en":
    case "en-AG":
    case "en-AU":
    case "en-BW":
    case "en-CA":
    case "en-DK":
    case "en-GB":
    case "en-HK":
    case "en-IE":
    case "en-IN":
    case "en-NG":
    case "en-NZ":
    case "en-PH":
    case "en-SG":
    case "en-US":
    case "en-ZA":
    case "en-ZM":
    case "en-ZW":
    case "eo":
    case "eo-US":
    case "es":
    case "es-AR":
    case "es-BO":
    case "es-CL":
    case "es-CO":
    case "es-CR":
    case "es-CU":
    case "es-DO":
    case "es-EC":
    case "es-ES":
    case "es-GT":
    case "es-HN":
    case "es-MX":
    case "es-NI":
    case "es-PA":
    case "es-PE":
    case "es-PR":
    case "es-PY":
    case "es-SV":
    case "es-US":
    case "es-UY":
    case "es-VE":
    case "et":
    case "et-EE":
    case "eu":
    case "eu-ES":
    case "eu-FR":
    case "fa":
    case "fa-IR":
    case "fi":
    case "fi-FI":
    case "fo":
    case "fo-FO":
    case "fur":
    case "fur-IT":
    case "fy":
    case "fy-DE":
    case "fy-NL":
    case "gl":
    case "gl-ES":
    case "gu":
    case "gu-IN":
    case "ha":
    case "ha-NG":
    case "he":
    case "he-IL":
    case "hu":
    case "hu-HU":
    case "is":
    case "is-IS":
    case "it":
    case "it-CH":
    case "it-IT":
    case "ku":
    case "ku-TR":
    case "lb":
    case "lb-LU":
    case "ml":
    case "ml-IN":
    case "mn":
    case "mn-MN":
    case "mr":
    case "mr-IN":
    case "nah":
    case "nb":
    case "nb-NO":
    case "ne":
    case "ne-NP":
    case "nl":
    case "nl-AW":
    case "nl-BE":
    case "nl-NL":
    case "nn":
    case "nn-NO":
    case "no":
    case "om":
    case "om-ET":
    case "om-KE":
    case "or":
    case "or-IN":
    case "pa":
    case "pa-IN":
    case "pa-PK":
    case "pap":
    case "pap-AN":
    case "pap-AW":
    case "pap-CW":
    case "ps":
    case "ps-AF":
    case "pt":
    case "pt-BR":
    case "pt-PT":
    case "so":
    case "so-DJ":
    case "so-ET":
    case "so-KE":
    case "so-SO":
    case "sq":
    case "sq-AL":
    case "sq-MK":
    case "sv":
    case "sv-FI":
    case "sv-SE":
    case "sw":
    case "sw-KE":
    case "sw-TZ":
    case "ta":
    case "ta-IN":
    case "ta-LK":
    case "te":
    case "te-IN":
    case "tk":
    case "tk-TM":
    case "ur":
    case "ur-IN":
    case "ur-PK":
    case "zu":
    case "zu-ZA":
      return number === 1 ? 0 : 1;
    case "am":
    case "am-ET":
    case "bh":
    case "fil":
    case "fil-PH":
    case "fr":
    case "fr-BE":
    case "fr-CA":
    case "fr-CH":
    case "fr-FR":
    case "fr-LU":
    case "gun":
    case "hi":
    case "hi-IN":
    case "hy":
    case "hy-AM":
    case "ln":
    case "ln-CD":
    case "mg":
    case "mg-MG":
    case "nso":
    case "nso-ZA":
    case "ti":
    case "ti-ER":
    case "ti-ET":
    case "wa":
    case "wa-BE":
    case "xbr":
      return number === 0 || number === 1 ? 0 : 1;
    case "be":
    case "be-BY":
    case "bs":
    case "bs-BA":
    case "hr":
    case "hr-HR":
    case "ru":
    case "ru-RU":
    case "ru-UA":
    case "sr":
    case "sr-ME":
    case "sr-RS":
    case "uk":
    case "uk-UA":
      return number % 10 == 1 && number % 100 != 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "cs":
    case "cs-CZ":
    case "sk":
    case "sk-SK":
      return number == 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
    case "ga":
    case "ga-IE":
      return number == 1 ? 0 : number == 2 ? 1 : 2;
    case "lt":
    case "lt-LT":
      return number % 10 == 1 && number % 100 != 11 ? 0 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "sl":
    case "sl-SI":
      return number % 100 == 1 ? 0 : number % 100 == 2 ? 1 : number % 100 == 3 || number % 100 == 4 ? 2 : 3;
    case "mk":
    case "mk-MK":
      return number % 10 == 1 ? 0 : 1;
    case "mt":
    case "mt-MT":
      return number == 1 ? 0 : number == 0 || number % 100 > 1 && number % 100 < 11 ? 1 : number % 100 > 10 && number % 100 < 20 ? 2 : 3;
    case "lv":
    case "lv-LV":
      return number == 0 ? 0 : number % 10 == 1 && number % 100 != 11 ? 1 : 2;
    case "pl":
    case "pl-PL":
      return number == 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 1 : 2;
    case "cy":
    case "cy-GB":
      return number == 1 ? 0 : number == 2 ? 1 : number == 8 || number == 11 ? 2 : 3;
    case "ro":
    case "ro-RO":
      return number == 1 ? 0 : number == 0 || number % 100 > 0 && number % 100 < 20 ? 1 : 2;
    case "ar":
    case "ar-AE":
    case "ar-BH":
    case "ar-DZ":
    case "ar-EG":
    case "ar-IN":
    case "ar-IQ":
    case "ar-JO":
    case "ar-KW":
    case "ar-LB":
    case "ar-LY":
    case "ar-MA":
    case "ar-OM":
    case "ar-QA":
    case "ar-SA":
    case "ar-SD":
    case "ar-SS":
    case "ar-SY":
    case "ar-TN":
    case "ar-YE":
      return number == 0 ? 0 : number == 1 ? 1 : number == 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 && number % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}
function choose(message, number, lang2) {
  let segments = message.split("|");
  const extracted = extract(segments, number);
  if (extracted !== null) {
    return extracted.trim();
  }
  segments = stripConditions(segments);
  const pluralIndex = getPluralIndex(lang2, number);
  if (segments.length === 1 || !segments[pluralIndex]) {
    return segments[0];
  }
  return segments[pluralIndex];
}
function extract(segments, number) {
  for (const part of segments) {
    let line = extractFromString(part, number);
    if (line !== null) {
      return line;
    }
  }
  return null;
}
function extractFromString(part, number) {
  const matches = part.match(/^[\{\[]([^\[\]\{\}]*)[\}\]]([\s\S]*)/) || [];
  if (matches.length !== 3) {
    return null;
  }
  const condition = matches[1];
  const value = matches[2];
  if (condition.includes(",")) {
    let [from2, to2] = condition.split(",");
    if (to2 === "*" && number >= parseFloat(from2)) {
      return value;
    } else if (from2 === "*" && number <= parseFloat(to2)) {
      return value;
    } else if (number >= parseFloat(from2) && number <= parseFloat(to2)) {
      return value;
    }
  }
  return parseFloat(condition) === number ? value : null;
}
function stripConditions(segments) {
  return segments.map((part) => part.replace(/^[\{\[]([^\[\]\{\}]*)[\}\]]/, ""));
}
const avoidException = (callback, param, defaults2 = {}) => {
  try {
    return callback(param);
  } catch {
    return defaults2;
  }
};
const avoidExceptionOnPromise = async (promise, defaults2 = {}) => {
  try {
    return (await promise).default || defaults2;
  } catch (e2) {
    return defaults2;
  }
};
const __vite_import_meta_env__ = {};
function hasPhpTranslations(isServer2) {
  return isServer2 || checkProcessEnv() || checkImportMeta();
}
function checkProcessEnv() {
  return typeof process !== "undefined" && true ? true : false;
}
function checkImportMeta() {
  return typeof __vite_import_meta_env__ !== "undefined" && /** @ts-ignore */
  "true" ? true : false;
}
const isServer = typeof window === "undefined";
let sharedInstance = null;
const DEFAULT_OPTIONS = {
  lang: !isServer && document.documentElement.lang ? document.documentElement.lang.replace("-", "_") : null,
  fallbackLang: "en",
  fallbackMissingTranslations: false,
  resolve: (lang2) => new Promise((resolve) => resolve({ default: {} })),
  onLoad: (lang2) => {
  }
};
computed(() => {
  return I18n.getSharedInstance().getCurrentLanguage().value;
});
const DEFAULT_PLUGIN_OPTIONS = {
  shared: true
};
function loadLanguageAsync(lang2, dashLangTry = false) {
  return I18n.getSharedInstance().loadLanguageAsync(lang2, dashLangTry);
}
function trans(key2, replacements = {}) {
  return I18n.getSharedInstance().trans(key2, replacements);
}
const i18nVue = {
  install(app, options = {}) {
    options = { ...DEFAULT_PLUGIN_OPTIONS, ...options };
    const i18n = options.shared ? I18n.getSharedInstance(options, true) : new I18n(options);
    app.config.globalProperties.$t = (key2, replacements) => i18n.trans(key2, replacements);
    app.config.globalProperties.$tChoice = (key2, number, replacements) => i18n.transChoice(key2, number, replacements);
    app.provide("i18n", i18n);
  }
};
class I18n {
  /**
   * Creates a new instance of the I18n class, applying default options
   */
  constructor(options = {}) {
    this.currentLanguage = ref(DEFAULT_OPTIONS.lang || DEFAULT_OPTIONS.fallbackLang);
    this.activeMessages = reactive({});
    this.fallbackMessages = reactive({});
    this.reset = () => {
      I18n.loaded = [];
      this.options = DEFAULT_OPTIONS;
      for (const [key2] of Object.entries(this.activeMessages)) {
        this.activeMessages[key2] = null;
      }
      if (this === sharedInstance) {
        sharedInstance = null;
      }
    };
    this.options = { ...DEFAULT_OPTIONS, ...options };
    if (this.options.fallbackMissingTranslations) {
      this.loadFallbackLanguage();
    } else {
      this.load();
    }
  }
  /**
   * Sets options on the instance, preserving any values not present in new options
   */
  setOptions(options = {}, forceLoad = false) {
    this.options = { ...this.options, ...options };
    if (forceLoad) {
      this.load();
    }
    return this;
  }
  /**
   * Loads the language.
   */
  load() {
    this[isServer ? "loadLanguage" : "loadLanguageAsync"](this.getActiveLanguage());
  }
  /**
   * Load fallback language
   */
  loadFallbackLanguage() {
    if (!isServer) {
      this.resolveLangAsync(this.options.resolve, this.options.fallbackLang).then(({ default: messages2 }) => {
        this.applyFallbackLanguage(this.options.fallbackLang, messages2);
        this.load();
      });
      return;
    }
    const { default: messages } = this.resolveLang(this.options.resolve, this.options.fallbackLang);
    this.applyFallbackLanguage(this.options.fallbackLang, messages);
    this.loadLanguage(this.getActiveLanguage());
  }
  /**
   * Loads the language async.
   */
  loadLanguage(lang2, dashLangTry = false) {
    const loadedLang = I18n.loaded.find((row) => row.lang === lang2);
    if (loadedLang) {
      this.setLanguage(loadedLang);
      return;
    }
    const { default: messages } = this.resolveLang(this.options.resolve, lang2);
    this.applyLanguage(lang2, messages, dashLangTry, this.loadLanguage);
  }
  /**
   * Loads the language file.
   */
  loadLanguageAsync(lang2, dashLangTry = false, ignoreAbort = false) {
    if (!ignoreAbort) {
      this.abortController?.abort();
      this.abortController = new AbortController();
    }
    const loadedLang = I18n.loaded.find((row) => row.lang === lang2);
    if (loadedLang) {
      return Promise.resolve(this.setLanguage(loadedLang));
    }
    return new Promise((resolve, reject) => {
      this.abortController.signal.addEventListener("abort", () => {
        resolve();
      });
      this.resolveLangAsync(this.options.resolve, lang2).then(({ default: messages }) => {
        resolve(this.applyLanguage(lang2, messages, dashLangTry, this.loadLanguageAsync));
      });
    });
  }
  /**
   * Resolves the language file or data, from direct data, synchronously.
   */
  resolveLang(callable, lang2, data = {}) {
    if (!Object.keys(data).length) {
      data = avoidException(callable, lang2);
    }
    if (hasPhpTranslations(isServer)) {
      return {
        default: {
          ...data,
          ...avoidException(callable, `php_${lang2}`)
        }
      };
    }
    return { default: data };
  }
  /**
   * It resolves the language file or data, from direct data, require or Promise.
   */
  async resolveLangAsync(callable, lang2) {
    let data = avoidException(callable, lang2);
    if (!(data instanceof Promise)) {
      return this.resolveLang(callable, lang2, data);
    }
    if (hasPhpTranslations(isServer)) {
      const phpLang = await avoidExceptionOnPromise(callable(`php_${lang2}`));
      const jsonLang = await avoidExceptionOnPromise(data);
      return new Promise((resolve) => resolve({
        default: {
          ...phpLang,
          ...jsonLang
        }
      }));
    }
    return new Promise(async (resolve) => resolve({
      default: await avoidExceptionOnPromise(data)
    }));
  }
  /**
   * Applies the language data and saves it to the loaded storage.
   */
  applyLanguage(lang2, messages, dashLangTry = false, callable) {
    if (Object.keys(messages).length < 1) {
      if (/[-_]/g.test(lang2) && !dashLangTry) {
        return callable.call(this, lang2.replace(/[-_]/g, (char) => char === "-" ? "_" : "-"), true, true);
      }
      if (lang2 !== this.options.fallbackLang) {
        return callable.call(this, this.options.fallbackLang, false, true);
      }
    }
    const data = { lang: lang2, messages };
    this.addLoadedLang(data);
    return this.setLanguage(data);
  }
  applyFallbackLanguage(lang2, messages) {
    for (const [key2, value] of Object.entries(messages)) {
      this.fallbackMessages[key2] = value;
    }
    this.addLoadedLang({
      lang: this.options.fallbackLang,
      messages
    });
  }
  /**
   * Adds to the array of loaded languages.
   */
  addLoadedLang(data) {
    const foundIndex = I18n.loaded.findIndex((item) => item.lang === data.lang);
    if (foundIndex !== -1) {
      I18n.loaded[foundIndex] = data;
      return;
    }
    I18n.loaded.push(data);
  }
  /**
   * Sets the language messages to the activeMessages.
   */
  setLanguage({ lang: lang2, messages }) {
    if (!isServer) {
      document.documentElement.setAttribute("lang", lang2.replace("_", "-"));
    }
    this.options.lang = lang2;
    this.currentLanguage.value = lang2;
    for (const [key2, value] of Object.entries(messages)) {
      this.activeMessages[key2] = value;
    }
    for (const [key2, value] of Object.entries(this.fallbackMessages)) {
      if (!this.isValid(messages[key2]) || this.activeMessages[key2] === key2) {
        this.activeMessages[key2] = value;
      }
    }
    for (const [key2] of Object.entries(this.activeMessages)) {
      if (!this.isValid(messages[key2]) && !this.isValid(this.fallbackMessages[key2])) {
        this.activeMessages[key2] = null;
      }
    }
    this.options.onLoad(lang2);
    return lang2;
  }
  /**
   * Returns the current active language.
   */
  getActiveLanguage() {
    return this.options.lang || this.options.fallbackLang;
  }
  /**
   * Returns the reactive current active language
   */
  getCurrentLanguage() {
    return computed(() => this.currentLanguage.value);
  }
  /**
   * Checks if the language is loaded.
   */
  isLoaded(lang2) {
    lang2 ?? (lang2 = this.getActiveLanguage());
    return I18n.loaded.some((row) => row.lang.replace(/[-_]/g, "-") === lang2.replace(/[-_]/g, "-"));
  }
  /**
   * Get the translation for the given key.
   */
  trans(key2, replacements = {}) {
    return this.wTrans(key2, replacements).value;
  }
  /**
   * Get the translation for the given key and watch for any changes.
   */
  wTrans(key2, replacements = {}) {
    watchEffect(() => {
      let value = this.findTranslation(key2);
      if (!this.isValid(value)) {
        value = this.findTranslation(key2.replace(/\//g, "."));
      }
      this.activeMessages[key2] = this.isValid(value) ? value : key2;
    });
    return computed(() => this.makeReplacements(this.activeMessages[key2], replacements));
  }
  /**
   * Translates the given message based on a count.
   */
  transChoice(key2, number, replacements = {}) {
    return this.wTransChoice(key2, number, replacements).value;
  }
  /**
   * Translates the given message based on a count and watch for changes.
   */
  wTransChoice(key2, number, replacements = {}) {
    const message = this.wTrans(key2, replacements);
    replacements.count = number.toString();
    return computed(() => this.makeReplacements(choose(message.value, number, this.options.lang), replacements));
  }
  /**
   * Find translation in memory.
   */
  findTranslation(key2) {
    if (this.isValid(this.activeMessages[key2])) {
      return this.activeMessages[key2];
    }
    const hasChildItems = this.activeMessages[`${key2}.0`] !== void 0;
    if (hasChildItems) {
      const childItems = Object.entries(this.activeMessages).filter((item) => item[0].startsWith(`${key2}.`)).map((item) => item[1]);
      return reactive(childItems);
    }
    return this.activeMessages[key2];
  }
  /**
   * Make the place-holder replacements on a line.
   */
  makeReplacements(message, replacements) {
    const capitalize = (s2) => s2.charAt(0).toUpperCase() + s2.slice(1);
    Object.entries(replacements || []).sort((a2, b2) => a2[0].length >= b2[0].length ? -1 : 1).forEach(([key2, value]) => {
      value = value.toString();
      message = (message || "").replace(new RegExp(`:${key2}`, "g"), value).replace(new RegExp(`:${key2.toUpperCase()}`, "g"), value.toUpperCase()).replace(new RegExp(`:${capitalize(key2)}`, "g"), capitalize(value));
    });
    return message;
  }
  /**
   * Checks if the message provided is valid.
   */
  isValid(message) {
    return message !== void 0 && message !== null;
  }
  /**
   * Gets the shared I18n instance, instantiating it if not yet created
   */
  static getSharedInstance(options, forceLoad = false) {
    return sharedInstance?.setOptions(options, forceLoad) || (sharedInstance = new I18n(options));
  }
}
I18n.loaded = [];
function ye(e2, t3) {
  for (const o2 in t3)
    Object.prototype.hasOwnProperty.call(t3, o2) && (typeof t3[o2] == "object" && e2[o2] ? ye(e2[o2], t3[o2]) : e2[o2] = t3[o2]);
}
const h = {
  // Disable popper components
  disabled: false,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: false,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: true,
  // Flip to the opposite placement if needed
  flip: true,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: true,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: true,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: false,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e2) => [...e2, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: false,
      // Enable HTML content in directive
      html: false,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: true,
      // Hide on clock outside
      autoHide: true
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function S(e2, t3) {
  let o2 = h.themes[e2] || {}, i2;
  do
    i2 = o2[t3], typeof i2 > "u" ? o2.$extend ? o2 = h.themes[o2.$extend] || {} : (o2 = null, i2 = h[t3]) : o2 = null;
  while (o2);
  return i2;
}
function Ze(e2) {
  const t3 = [e2];
  let o2 = h.themes[e2] || {};
  do
    o2.$extend && !o2.$resetCss ? (t3.push(o2.$extend), o2 = h.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t3.map((i2) => `v-popper--theme-${i2}`);
}
function re(e2) {
  const t3 = [e2];
  let o2 = h.themes[e2] || {};
  do
    o2.$extend ? (t3.push(o2.$extend), o2 = h.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t3;
}
let $ = false;
if (typeof window < "u") {
  $ = false;
  try {
    const e2 = Object.defineProperty({}, "passive", {
      get() {
        $ = true;
      }
    });
    window.addEventListener("test", null, e2);
  } catch {
  }
}
let _e = false;
typeof window < "u" && typeof navigator < "u" && (_e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Te = ["auto", "top", "bottom", "left", "right"].reduce((e2, t3) => e2.concat([
  t3,
  `${t3}-start`,
  `${t3}-end`
]), []), pe = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, ae = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function de(e2, t3) {
  const o2 = e2.indexOf(t3);
  o2 !== -1 && e2.splice(o2, 1);
}
function G() {
  return new Promise((e2) => requestAnimationFrame(() => {
    requestAnimationFrame(e2);
  }));
}
const d = [];
let g = null;
const le = {};
function he(e2) {
  let t3 = le[e2];
  return t3 || (t3 = le[e2] = []), t3;
}
let Y = function() {
};
typeof window < "u" && (Y = window.Element);
function n(e2) {
  return function(t3) {
    return S(t3.theme, e2);
  };
}
const q = "__floating-vue__popper", Q = () => defineComponent({
  name: "VPopper",
  provide() {
    return {
      [q]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [q]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    targetNodes: {
      type: Function,
      required: true
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: true
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: n("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: n("positioningDisabled")
    },
    placement: {
      type: String,
      default: n("placement"),
      validator: (e2) => Te.includes(e2)
    },
    delay: {
      type: [String, Number, Object],
      default: n("delay")
    },
    distance: {
      type: [Number, String],
      default: n("distance")
    },
    skidding: {
      type: [Number, String],
      default: n("skidding")
    },
    triggers: {
      type: Array,
      default: n("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: n("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: n("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: n("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: n("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: n("popperHideTriggers")
    },
    container: {
      type: [String, Object, Y, Boolean],
      default: n("container")
    },
    boundary: {
      type: [String, Y],
      default: n("boundary")
    },
    strategy: {
      type: String,
      validator: (e2) => ["absolute", "fixed"].includes(e2),
      default: n("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: n("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: n("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: n("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: n("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: n("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: n("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: n("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: n("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: n("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: n("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: n("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: n("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: n("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: n("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: n("flip")
    },
    shift: {
      type: Boolean,
      default: n("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: n("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: n("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: n("disposeTimeout")
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e2) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  data() {
    return {
      isShown: false,
      isMounted: false,
      skipTransition: false,
      classes: {
        showFrom: false,
        showTo: false,
        hideFrom: false,
        hideTo: true
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e2) => e2.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: true,
      pendingHide: false,
      containsGlobalTarget: false,
      isDisposed: true,
      mouseDownContains: false
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e2;
      return (e2 = this[q]) == null ? void 0 : e2.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e2, t3;
      return ((e2 = this.popperTriggers) == null ? void 0 : e2.includes("hover")) || ((t3 = this.popperShowTriggers) == null ? void 0 : t3.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e2) {
      e2 ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: true
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e2, t3) => (e2[t3] = "$_computePosition", e2), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e2 = null, skipDelay: t3 = false, force: o2 = false } = {}) {
      var i2, s2;
      (i2 = this.parentPopper) != null && i2.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = false, (o2 || !this.disabled) && (((s2 = this.parentPopper) == null ? void 0 : s2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e2, t3), this.$emit("show"), this.$_showFrameLocked = true, requestAnimationFrame(() => {
        this.$_showFrameLocked = false;
      })), this.$emit("update:shown", true));
    },
    hide({ event: e2 = null, skipDelay: t3 = false } = {}) {
      var o2;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = true;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t3 }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o2 = this.parentPopper) == null ? void 0 : o2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = false, this.$_scheduleHide(e2, t3), this.$emit("hide"), this.$emit("update:shown", false);
      }
    },
    init() {
      var e2;
      this.isDisposed && (this.isDisposed = false, this.isMounted = false, this.$_events = [], this.$_preventShow = false, this.$_referenceNode = ((e2 = this.referenceNode) == null ? void 0 : e2.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t3) => t3.nodeType === t3.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = true, this.$_removeEventListeners(), this.hide({ skipDelay: true }), this.$_detachPopperNode(), this.isMounted = false, this.isShown = false, this.$_updateParentShownChildren(false), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e2 = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e2.middleware.push(offset$1({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t3 = this.placement.startsWith("auto");
      if (t3 ? e2.middleware.push(autoPlacement({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e2.placement = this.placement, this.preventOverflow && (this.shift && e2.middleware.push(shift({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t3 && this.flip && e2.middleware.push(flip({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e2.middleware.push(arrow({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e2.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i2, rects: s2, middlewareData: r2 }) => {
          let p2;
          const { centerOffset: a2 } = r2.arrow;
          return i2.startsWith("top") || i2.startsWith("bottom") ? p2 = Math.abs(a2) > s2.reference.width / 2 : p2 = Math.abs(a2) > s2.reference.height / 2, {
            data: {
              overflow: p2
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i2 = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e2.middleware.push({
          name: "autoSize",
          fn: ({ rects: s2, placement: r2, middlewareData: p2 }) => {
            var u2;
            if ((u2 = p2.autoSize) != null && u2.skip)
              return {};
            let a2, l2;
            return r2.startsWith("top") || r2.startsWith("bottom") ? a2 = s2.reference.width : l2 = s2.reference.height, this.$_innerNode.style[i2 === "min" ? "minWidth" : i2 === "max" ? "maxWidth" : "width"] = a2 != null ? `${a2}px` : null, this.$_innerNode.style[i2 === "min" ? "minHeight" : i2 === "max" ? "maxHeight" : "height"] = l2 != null ? `${l2}px` : null, {
              data: {
                skip: true
              },
              reset: {
                rects: true
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e2.middleware.push(size({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i2, availableHeight: s2 }) => {
          this.$_innerNode.style.maxWidth = i2 != null ? `${i2}px` : null, this.$_innerNode.style.maxHeight = s2 != null ? `${s2}px` : null;
        }
      })));
      const o2 = await computePosition(this.$_referenceNode, this.$_popperNode, e2);
      Object.assign(this.result, {
        x: o2.x,
        y: o2.y,
        placement: o2.placement,
        strategy: o2.strategy,
        arrow: {
          ...o2.middlewareData.arrow,
          ...o2.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e2, t3 = false) {
      if (this.$_updateParentShownChildren(true), this.$_hideInProgress = false, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
        g.$_applyHide(true), this.$_applyShow(true);
        return;
      }
      t3 ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e2, t3 = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true;
        return;
      }
      this.$_updateParentShownChildren(false), this.$_hideInProgress = true, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t3 ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e2) {
      const t3 = this.delay;
      return parseInt(t3 && t3[e2] || t3 || 0);
    },
    async $_applyShow(e2 = false) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e2, !this.isShown && (this.$_ensureTeleport(), await G(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...getOverflowAncestors(this.$_referenceNode),
        ...getOverflowAncestors(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t3 = this.$_referenceNode.getBoundingClientRect(), o2 = this.$_popperNode.querySelector(".v-popper__wrapper"), i2 = o2.parentNode.getBoundingClientRect(), s2 = t3.x + t3.width / 2 - (i2.left + o2.offsetLeft), r2 = t3.y + t3.height / 2 - (i2.top + o2.offsetTop);
        this.result.transformOrigin = `${s2}px ${r2}px`;
      }
      this.isShown = true, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e2 = this.showGroup;
      if (e2) {
        let t3;
        for (let o2 = 0; o2 < d.length; o2++)
          t3 = d[o2], t3.showGroup !== e2 && (t3.hide(), t3.$emit("close-group"));
      }
      d.push(this), document.body.classList.add("v-popper--some-open");
      for (const t3 of re(this.theme))
        he(t3).push(this), document.body.classList.add(`v-popper--some-open--${t3}`);
      this.$emit("apply-show"), this.classes.showFrom = true, this.classes.showTo = false, this.classes.hideFrom = false, this.classes.hideTo = false, await G(), this.classes.showFrom = false, this.classes.showTo = true, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e2 = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true, this.$_hideInProgress = false;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e2, de(d, this), d.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o2 of re(this.theme)) {
        const i2 = he(o2);
        de(i2, this), i2.length === 0 && document.body.classList.remove(`v-popper--some-open--${o2}`);
      }
      g === this && (g = null), this.isShown = false, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t3 = this.disposeTimeout;
      t3 !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = false);
      }, t3)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = false, this.classes.showTo = false, this.classes.hideFrom = true, this.classes.hideTo = false, await G(), this.classes.hideFrom = false, this.classes.hideTo = true;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e2 = this.container;
      if (typeof e2 == "string" ? e2 = window.document.querySelector(e2) : e2 === false && (e2 = this.$_targetNodes[0].parentNode), !e2)
        throw new Error("No container for popover: " + this.container);
      e2.appendChild(this.$_popperNode), this.isMounted = true;
    },
    $_addEventListeners() {
      const e2 = (o2) => {
        this.isShown && !this.$_hideInProgress || (o2.usedByTooltip = true, !this.$_preventShow && this.show({ event: o2 }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, pe, this.triggers, this.showTriggers, e2), this.$_registerTriggerListeners([this.$_popperNode], pe, this.popperTriggers, this.popperShowTriggers, e2);
      const t3 = (o2) => {
        o2.usedByTooltip || this.hide({ event: o2 });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ae, this.triggers, this.hideTriggers, t3), this.$_registerTriggerListeners([this.$_popperNode], ae, this.popperTriggers, this.popperHideTriggers, t3);
    },
    $_registerEventListeners(e2, t3, o2) {
      this.$_events.push({ targetNodes: e2, eventType: t3, handler: o2 }), e2.forEach((i2) => i2.addEventListener(t3, o2, $ ? {
        passive: true
      } : void 0));
    },
    $_registerTriggerListeners(e2, t3, o2, i2, s2) {
      let r2 = o2;
      i2 != null && (r2 = typeof i2 == "function" ? i2(r2) : i2), r2.forEach((p2) => {
        const a2 = t3[p2];
        a2 && this.$_registerEventListeners(e2, a2, s2);
      });
    },
    $_removeEventListeners(e2) {
      const t3 = [];
      this.$_events.forEach((o2) => {
        const { targetNodes: i2, eventType: s2, handler: r2 } = o2;
        !e2 || e2 === s2 ? i2.forEach((p2) => p2.removeEventListener(s2, r2)) : t3.push(o2);
      }), this.$_events = t3;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e2, t3 = false) {
      this.$_showFrameLocked || (this.hide({ event: e2 }), e2.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t3 && (this.$_preventShow = true, setTimeout(() => {
        this.$_preventShow = false;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e2, t3) {
      for (const o2 of this.$_targetNodes) {
        const i2 = o2.getAttribute(e2);
        i2 && (o2.removeAttribute(e2), o2.setAttribute(t3, i2));
      }
    },
    $_applyAttrsToTarget(e2) {
      for (const t3 of this.$_targetNodes)
        for (const o2 in e2) {
          const i2 = e2[o2];
          i2 == null ? t3.removeAttribute(o2) : t3.setAttribute(o2, i2);
        }
    },
    $_updateParentShownChildren(e2) {
      let t3 = this.parentPopper;
      for (; t3; )
        e2 ? t3.shownChildren.add(this.randomId) : (t3.shownChildren.delete(this.randomId), t3.pendingHide && t3.hide()), t3 = t3.parentPopper;
    },
    $_isAimingPopper() {
      const e2 = this.$_referenceNode.getBoundingClientRect();
      if (y >= e2.left && y <= e2.right && _ >= e2.top && _ <= e2.bottom) {
        const t3 = this.$_popperNode.getBoundingClientRect(), o2 = y - c, i2 = _ - m, r2 = t3.left + t3.width / 2 - c + (t3.top + t3.height / 2) - m + t3.width + t3.height, p2 = c + o2 * r2, a2 = m + i2 * r2;
        return C2(c, m, p2, a2, t3.left, t3.top, t3.left, t3.bottom) || // Left edge
        C2(c, m, p2, a2, t3.left, t3.top, t3.right, t3.top) || // Top edge
        C2(c, m, p2, a2, t3.right, t3.top, t3.right, t3.bottom) || // Right edge
        C2(c, m, p2, a2, t3.left, t3.bottom, t3.right, t3.bottom);
      }
      return false;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (_e) {
    const e2 = $ ? {
      passive: true,
      capture: true
    } : true;
    document.addEventListener("touchstart", (t3) => ue(t3, true), e2), document.addEventListener("touchend", (t3) => fe(t3, true), e2);
  } else
    window.addEventListener("mousedown", (e2) => ue(e2, false), true), window.addEventListener("click", (e2) => fe(e2, false), true);
  window.addEventListener("resize", tt);
}
function ue(e2, t3) {
  if (h.autoHideOnMousedown)
    Pe(e2, t3);
  else
    for (let o2 = 0; o2 < d.length; o2++) {
      const i2 = d[o2];
      try {
        i2.mouseDownContains = i2.popperNode().contains(e2.target);
      } catch {
      }
    }
}
function fe(e2, t3) {
  h.autoHideOnMousedown || Pe(e2, t3);
}
function Pe(e2, t3) {
  const o2 = {};
  for (let i2 = d.length - 1; i2 >= 0; i2--) {
    const s2 = d[i2];
    try {
      const r2 = s2.containsGlobalTarget = s2.mouseDownContains || s2.popperNode().contains(e2.target);
      s2.pendingHide = false, requestAnimationFrame(() => {
        if (s2.pendingHide = false, !o2[s2.randomId] && ce(s2, r2, e2)) {
          if (s2.$_handleGlobalClose(e2, t3), !e2.closeAllPopover && e2.closePopover && r2) {
            let a2 = s2.parentPopper;
            for (; a2; )
              o2[a2.randomId] = true, a2 = a2.parentPopper;
            return;
          }
          let p2 = s2.parentPopper;
          for (; p2 && ce(p2, p2.containsGlobalTarget, e2); ) {
            p2.$_handleGlobalClose(e2, t3);
            p2 = p2.parentPopper;
          }
        }
      });
    } catch {
    }
  }
}
function ce(e2, t3, o2) {
  return o2.closeAllPopover || o2.closePopover && t3 || et(e2, o2) && !t3;
}
function et(e2, t3) {
  if (typeof e2.autoHide == "function") {
    const o2 = e2.autoHide(t3);
    return e2.lastAutoHide = o2, o2;
  }
  return e2.autoHide;
}
function tt() {
  for (let e2 = 0; e2 < d.length; e2++)
    d[e2].$_computePosition();
}
let c = 0, m = 0, y = 0, _ = 0;
typeof window < "u" && window.addEventListener("mousemove", (e2) => {
  c = y, m = _, y = e2.clientX, _ = e2.clientY;
}, $ ? {
  passive: true
} : void 0);
function C2(e2, t3, o2, i2, s2, r2, p2, a2) {
  const l2 = ((p2 - s2) * (t3 - r2) - (a2 - r2) * (e2 - s2)) / ((a2 - r2) * (o2 - e2) - (p2 - s2) * (i2 - t3)), u2 = ((o2 - e2) * (t3 - r2) - (i2 - t3) * (e2 - s2)) / ((a2 - r2) * (o2 - e2) - (p2 - s2) * (i2 - t3));
  return l2 >= 0 && l2 <= 1 && u2 >= 0 && u2 <= 1;
}
const ot = {
  extends: Q()
}, B = (e2, t3) => {
  const o2 = e2.__vccOpts || e2;
  for (const [i2, s2] of t3)
    o2[i2] = s2;
  return o2;
};
function it(e2, t3, o2, i2, s2, r2) {
  return openBlock(), createElementBlock("div", {
    ref: "reference",
    class: normalizeClass(["v-popper", {
      "v-popper--shown": e2.slotData.isShown
    }])
  }, [
    renderSlot(e2.$slots, "default", normalizeProps(guardReactiveProps(e2.slotData)))
  ], 2);
}
const st = /* @__PURE__ */ B(ot, [["render", it]]);
function nt() {
  var e2 = window.navigator.userAgent, t3 = e2.indexOf("MSIE ");
  if (t3 > 0)
    return parseInt(e2.substring(t3 + 5, e2.indexOf(".", t3)), 10);
  var o2 = e2.indexOf("Trident/");
  if (o2 > 0) {
    var i2 = e2.indexOf("rv:");
    return parseInt(e2.substring(i2 + 3, e2.indexOf(".", i2)), 10);
  }
  var s2 = e2.indexOf("Edge/");
  return s2 > 0 ? parseInt(e2.substring(s2 + 5, e2.indexOf(".", s2)), 10) : -1;
}
let z;
function X() {
  X.init || (X.init = true, z = nt() !== -1);
}
var E = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: false
    },
    ignoreWidth: {
      type: Boolean,
      default: false
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    X(), nextTick(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e2 = document.createElement("object");
    this._resizeObject = e2, e2.setAttribute("aria-hidden", "true"), e2.setAttribute("tabindex", -1), e2.onload = this.addResizeHandlers, e2.type = "text/html", z && this.$el.appendChild(e2), e2.data = "about:blank", z || this.$el.appendChild(e2);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!z && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const rt = /* @__PURE__ */ withScopeId("data-v-b329ee4c");
pushScopeId("data-v-b329ee4c");
const pt = {
  class: "resize-observer",
  tabindex: "-1"
};
popScopeId();
const at = /* @__PURE__ */ rt((e2, t3, o2, i2, s2, r2) => (openBlock(), createBlock("div", pt)));
E.render = at;
E.__scopeId = "data-v-b329ee4c";
E.__file = "src/components/ResizeObserver.vue";
const Z = (e2 = "theme") => ({
  computed: {
    themeClass() {
      return Ze(this[e2]);
    }
  }
}), dt = defineComponent({
  name: "VPopperContent",
  components: {
    ResizeObserver: E
  },
  mixins: [
    Z()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e2) {
      return e2 != null && !isNaN(e2) ? `${e2}px` : null;
    }
  }
}), lt = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ht = {
  ref: "inner",
  class: "v-popper__inner"
}, ut = /* @__PURE__ */ createElementVNode("div", { class: "v-popper__arrow-outer" }, null, -1), ft = /* @__PURE__ */ createElementVNode("div", { class: "v-popper__arrow-inner" }, null, -1), ct = [
  ut,
  ft
];
function mt(e2, t3, o2, i2, s2, r2) {
  const p2 = resolveComponent("ResizeObserver");
  return openBlock(), createElementBlock("div", {
    id: e2.popperId,
    ref: "popover",
    class: normalizeClass(["v-popper__popper", [
      e2.themeClass,
      e2.classes.popperClass,
      {
        "v-popper__popper--shown": e2.shown,
        "v-popper__popper--hidden": !e2.shown,
        "v-popper__popper--show-from": e2.classes.showFrom,
        "v-popper__popper--show-to": e2.classes.showTo,
        "v-popper__popper--hide-from": e2.classes.hideFrom,
        "v-popper__popper--hide-to": e2.classes.hideTo,
        "v-popper__popper--skip-transition": e2.skipTransition,
        "v-popper__popper--arrow-overflow": e2.result && e2.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e2.result
      }
    ]]),
    style: normalizeStyle(e2.result ? {
      position: e2.result.strategy,
      transform: `translate3d(${Math.round(e2.result.x)}px,${Math.round(e2.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e2.shown ? "false" : "true",
    tabindex: e2.autoHide ? 0 : void 0,
    "data-popper-placement": e2.result ? e2.result.placement : void 0,
    onKeyup: t3[2] || (t3[2] = withKeys((a2) => e2.autoHide && e2.$emit("hide"), ["esc"]))
  }, [
    createElementVNode("div", {
      class: "v-popper__backdrop",
      onClick: t3[0] || (t3[0] = (a2) => e2.autoHide && e2.$emit("hide"))
    }),
    createElementVNode("div", {
      class: "v-popper__wrapper",
      style: normalizeStyle(e2.result ? {
        transformOrigin: e2.result.transformOrigin
      } : void 0)
    }, [
      createElementVNode("div", ht, [
        e2.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("div", null, [
            renderSlot(e2.$slots, "default")
          ]),
          e2.handleResize ? (openBlock(), createBlock(p2, {
            key: 0,
            onNotify: t3[1] || (t3[1] = (a2) => e2.$emit("resize", a2))
          })) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ], 512),
      createElementVNode("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: normalizeStyle(e2.result ? {
          left: e2.toPx(e2.result.arrow.x),
          top: e2.toPx(e2.result.arrow.y)
        } : void 0)
      }, ct, 4)
    ], 4)
  ], 46, lt);
}
const ee = /* @__PURE__ */ B(dt, [["render", mt]]), te = {
  methods: {
    show(...e2) {
      return this.$refs.popper.show(...e2);
    },
    hide(...e2) {
      return this.$refs.popper.hide(...e2);
    },
    dispose(...e2) {
      return this.$refs.popper.dispose(...e2);
    },
    onResize(...e2) {
      return this.$refs.popper.onResize(...e2);
    }
  }
};
let K = function() {
};
typeof window < "u" && (K = window.Element);
const gt = defineComponent({
  name: "VPopperWrapper",
  components: {
    Popper: st,
    PopperContent: ee
  },
  mixins: [
    te,
    Z("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, K, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, K],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e2) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e2) => e2 !== this.$refs.popperContent.$el);
    }
  }
});
function wt(e2, t3, o2, i2, s2, r2) {
  const p2 = resolveComponent("PopperContent"), a2 = resolveComponent("Popper");
  return openBlock(), createBlock(a2, mergeProps({ ref: "popper" }, e2.$props, {
    theme: e2.finalTheme,
    "target-nodes": e2.getTargetNodes,
    "popper-node": () => e2.$refs.popperContent.$el,
    class: [
      e2.themeClass
    ],
    onShow: t3[0] || (t3[0] = () => e2.$emit("show")),
    onHide: t3[1] || (t3[1] = () => e2.$emit("hide")),
    "onUpdate:shown": t3[2] || (t3[2] = (l2) => e2.$emit("update:shown", l2)),
    onApplyShow: t3[3] || (t3[3] = () => e2.$emit("apply-show")),
    onApplyHide: t3[4] || (t3[4] = () => e2.$emit("apply-hide")),
    onCloseGroup: t3[5] || (t3[5] = () => e2.$emit("close-group")),
    onCloseDirective: t3[6] || (t3[6] = () => e2.$emit("close-directive")),
    onAutoHide: t3[7] || (t3[7] = () => e2.$emit("auto-hide")),
    onResize: t3[8] || (t3[8] = () => e2.$emit("resize"))
  }), {
    default: withCtx(({
      popperId: l2,
      isShown: u2,
      shouldMountContent: L,
      skipTransition: D2,
      autoHide: I2,
      show: F,
      hide: v2,
      handleResize: R2,
      onResize: j2,
      classes: V,
      result: Ee
    }) => [
      renderSlot(e2.$slots, "default", {
        shown: u2,
        show: F,
        hide: v2
      }),
      createVNode(p2, {
        ref: "popperContent",
        "popper-id": l2,
        theme: e2.finalTheme,
        shown: u2,
        mounted: L,
        "skip-transition": D2,
        "auto-hide": I2,
        "handle-resize": R2,
        classes: V,
        result: Ee,
        onHide: v2,
        onResize: j2
      }, {
        default: withCtx(() => [
          renderSlot(e2.$slots, "popper", {
            shown: u2,
            hide: v2
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const k = /* @__PURE__ */ B(gt, [["render", wt]]), Se = {
  ...k,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, be = {
  ...k,
  name: "VMenu",
  vPopperTheme: "menu"
}, Ce = {
  ...k,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, $t = defineComponent({
  name: "VTooltipDirective",
  components: {
    Popper: Q(),
    PopperContent: ee
  },
  mixins: [
    te
  ],
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e2) => S(e2.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e2) => S(e2.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(true);
      },
      immediate: true
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e2) {
      if (typeof this.content == "function" && this.$_isShown && (e2 || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = true;
        const t3 = ++this.$_fetchId, o2 = this.content(this);
        o2.then ? o2.then((i2) => this.onResult(t3, i2)) : this.onResult(t3, o2);
      }
    },
    onResult(e2, t3) {
      e2 === this.$_fetchId && (this.$_loading = false, this.asyncContent = t3);
    },
    onShow() {
      this.$_isShown = true, this.fetchContent();
    },
    onHide() {
      this.$_isShown = false;
    }
  }
}), vt = ["innerHTML"], yt = ["textContent"];
function _t(e2, t3, o2, i2, s2, r2) {
  const p2 = resolveComponent("PopperContent"), a2 = resolveComponent("Popper");
  return openBlock(), createBlock(a2, mergeProps({ ref: "popper" }, e2.$attrs, {
    theme: e2.theme,
    "target-nodes": e2.targetNodes,
    "popper-node": () => e2.$refs.popperContent.$el,
    onApplyShow: e2.onShow,
    onApplyHide: e2.onHide
  }), {
    default: withCtx(({
      popperId: l2,
      isShown: u2,
      shouldMountContent: L,
      skipTransition: D2,
      autoHide: I2,
      hide: F,
      handleResize: v2,
      onResize: R2,
      classes: j2,
      result: V
    }) => [
      createVNode(p2, {
        ref: "popperContent",
        class: normalizeClass({
          "v-popper--tooltip-loading": e2.loading
        }),
        "popper-id": l2,
        theme: e2.theme,
        shown: u2,
        mounted: L,
        "skip-transition": D2,
        "auto-hide": I2,
        "handle-resize": v2,
        classes: j2,
        result: V,
        onHide: F,
        onResize: R2
      }, {
        default: withCtx(() => [
          e2.html ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: e2.finalContent
          }, null, 8, vt)) : (openBlock(), createElementBlock("div", {
            key: 1,
            textContent: toDisplayString(e2.finalContent)
          }, null, 8, yt))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const ze = /* @__PURE__ */ B($t, [["render", _t]]), Ae = "v-popper--has-tooltip";
function Tt(e2, t3) {
  let o2 = e2.placement;
  if (!o2 && t3)
    for (const i2 of Te)
      t3[i2] && (o2 = i2);
  return o2 || (o2 = S(e2.theme || "tooltip", "placement")), o2;
}
function Ne(e2, t3, o2) {
  let i2;
  const s2 = typeof t3;
  return s2 === "string" ? i2 = { content: t3 } : t3 && s2 === "object" ? i2 = t3 : i2 = { content: false }, i2.placement = Tt(i2, o2), i2.targetNodes = () => [e2], i2.referenceNode = () => e2, i2;
}
let x2, b, Pt = 0;
function St() {
  if (x2)
    return;
  b = ref([]), x2 = createApp({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: b
      };
    },
    render() {
      return this.directives.map((t3) => h$2(ze, {
        ...t3.options,
        shown: t3.shown || t3.options.shown,
        key: t3.id
      }));
    },
    devtools: {
      hide: true
    }
  });
  const e2 = document.createElement("div");
  document.body.appendChild(e2), x2.mount(e2);
}
function bt(e2, t3, o2) {
  St();
  const i2 = ref(Ne(e2, t3, o2)), s2 = ref(false), r2 = {
    id: Pt++,
    options: i2,
    shown: s2
  };
  return b.value.push(r2), e2.classList && e2.classList.add(Ae), e2.$_popper = {
    options: i2,
    item: r2,
    show() {
      s2.value = true;
    },
    hide() {
      s2.value = false;
    }
  };
}
function He(e2) {
  if (e2.$_popper) {
    const t3 = b.value.indexOf(e2.$_popper.item);
    t3 !== -1 && b.value.splice(t3, 1), delete e2.$_popper, delete e2.$_popperOldShown, delete e2.$_popperMountTarget;
  }
  e2.classList && e2.classList.remove(Ae);
}
function me(e2, { value: t3, modifiers: o2 }) {
  const i2 = Ne(e2, t3, o2);
  if (!i2.content || S(i2.theme || "tooltip", "disabled"))
    He(e2);
  else {
    let s2;
    e2.$_popper ? (s2 = e2.$_popper, s2.options.value = i2) : s2 = bt(e2, t3, o2), typeof t3.shown < "u" && t3.shown !== e2.$_popperOldShown && (e2.$_popperOldShown = t3.shown, t3.shown ? s2.show() : s2.hide());
  }
}
const oe = {
  beforeMount: me,
  updated: me,
  beforeUnmount(e2) {
    He(e2);
  }
};
function ge(e2) {
  e2.addEventListener("mousedown", H), e2.addEventListener("click", H), e2.addEventListener("touchstart", Oe, $ ? {
    passive: true
  } : false);
}
function we(e2) {
  e2.removeEventListener("mousedown", H), e2.removeEventListener("click", H), e2.removeEventListener("touchstart", Oe), e2.removeEventListener("touchend", Me), e2.removeEventListener("touchcancel", Be);
}
function H(e2) {
  const t3 = e2.currentTarget;
  e2.closePopover = !t3.$_vclosepopover_touch, e2.closeAllPopover = t3.$_closePopoverModifiers && !!t3.$_closePopoverModifiers.all;
}
function Oe(e2) {
  if (e2.changedTouches.length === 1) {
    const t3 = e2.currentTarget;
    t3.$_vclosepopover_touch = true;
    const o2 = e2.changedTouches[0];
    t3.$_vclosepopover_touchPoint = o2, t3.addEventListener("touchend", Me), t3.addEventListener("touchcancel", Be);
  }
}
function Me(e2) {
  const t3 = e2.currentTarget;
  if (t3.$_vclosepopover_touch = false, e2.changedTouches.length === 1) {
    const o2 = e2.changedTouches[0], i2 = t3.$_vclosepopover_touchPoint;
    e2.closePopover = Math.abs(o2.screenY - i2.screenY) < 20 && Math.abs(o2.screenX - i2.screenX) < 20, e2.closeAllPopover = t3.$_closePopoverModifiers && !!t3.$_closePopoverModifiers.all;
  }
}
function Be(e2) {
  const t3 = e2.currentTarget;
  t3.$_vclosepopover_touch = false;
}
const ie = {
  beforeMount(e2, { value: t3, modifiers: o2 }) {
    e2.$_closePopoverModifiers = o2, (typeof t3 > "u" || t3) && ge(e2);
  },
  updated(e2, { value: t3, oldValue: o2, modifiers: i2 }) {
    e2.$_closePopoverModifiers = i2, t3 !== o2 && (typeof t3 > "u" || t3 ? ge(e2) : we(e2));
  },
  beforeUnmount(e2) {
    we(e2);
  }
};
function Ct(e2, t3 = {}) {
  e2.$_vTooltipInstalled || (e2.$_vTooltipInstalled = true, ye(h, t3), e2.directive("tooltip", oe), e2.directive("close-popper", ie), e2.component("VTooltip", Ce), e2.component("VDropdown", Se), e2.component("VMenu", be));
}
const Gt = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Ct,
  options: h
};
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a2, b2) {
  return Object.prototype.hasOwnProperty.call(a2, b2);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k2;
    for (k2 in obj) {
      if (hasOwnProp(obj, k2)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i2, arrLen = arr.length;
  for (i2 = 0; i2 < arrLen; ++i2) {
    res.push(fn(arr[i2], i2));
  }
  return res;
}
function extend(a2, b2) {
  for (var i2 in b2) {
    if (hasOwnProp(b2, i2)) {
      a2[i2] = b2[i2];
    }
  }
  if (hasOwnProp(b2, "toString")) {
    a2.toString = b2.toString;
  }
  if (hasOwnProp(b2, "valueOf")) {
    a2.valueOf = b2.valueOf;
  }
  return a2;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m2) {
  if (m2._pf == null) {
    m2._pf = defaultParsingFlags();
  }
  return m2._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t3 = Object(this), len = t3.length >>> 0, i2;
    for (i2 = 0; i2 < len; i2++) {
      if (i2 in t3 && fun.call(this, t3[i2], i2, t3)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m2) {
  var flags = null, parsedParts = false, isNowValid = m2._d && !isNaN(m2._d.getTime());
  if (isNowValid) {
    flags = getParsingFlags(m2);
    parsedParts = some.call(flags.parsedDateParts, function(i2) {
      return i2 != null;
    });
    isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m2._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
  }
  if (Object.isFrozen == null || !Object.isFrozen(m2)) {
    m2._isValid = isNowValid;
  } else {
    return isNowValid;
  }
  return m2._isValid;
}
function createInvalid(flags) {
  var m2 = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m2), flags);
  } else {
    getParsingFlags(m2).userInvalidated = true;
  }
  return m2;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i2, prop, val, momentPropertiesLen = momentProperties.length;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentPropertiesLen > 0) {
    for (i2 = 0; i2 < momentPropertiesLen; i2++) {
      prop = momentProperties[i2];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config2) {
  copyConfig(this, config2);
  this._d = new Date(config2._d != null ? config2._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = /* @__PURE__ */ new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i2, key2, argLen = arguments.length;
      for (i2 = 0; i2 < argLen; i2++) {
        arg = "";
        if (typeof arguments[i2] === "object") {
          arg += "\n[" + i2 + "] ";
          for (key2 in arguments[0]) {
            if (hasOwnProp(arguments[0], key2)) {
              arg += key2 + ": " + arguments[0][key2] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i2];
        }
        args.push(arg);
      }
      warn(
        msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack
      );
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name2, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name2, msg);
  }
  if (!deprecations[name2]) {
    warn(msg);
    deprecations[name2] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config2) {
  var prop, i2;
  for (i2 in config2) {
    if (hasOwnProp(config2, i2)) {
      prop = config2[i2];
      if (isFunction(prop)) {
        this[i2] = prop;
      } else {
        this["_" + i2] = prop;
      }
    }
  }
  this._config = config2;
  this._dayOfMonthOrdinalParseLenient = new RegExp(
    (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source
  );
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config2) {
  if (config2 != null) {
    this.set(config2);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i2, res = [];
    for (i2 in obj) {
      if (hasOwnProp(obj, i2)) {
        res.push(i2);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key2, mom, now2) {
  var output = this._calendar[key2] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign2 = number >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(
        func.apply(this, arguments),
        token2
      );
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array = format2.match(formattingTokens), i2, length;
  for (i2 = 0, length = array.length; i2 < length; i2++) {
    if (formatTokenFunctions[array[i2]]) {
      array[i2] = formatTokenFunctions[array[i2]];
    } else {
      array[i2] = removeFormattingTokens(array[i2]);
    }
  }
  return function(mom) {
    var output = "", i3;
    for (i3 = 0; i3 < length; i3++) {
      output += isFunction(array[i3]) ? array[i3].call(mom, format2) : array[i3];
    }
    return output;
  };
}
function formatMoment(m2, format2) {
  if (!m2.isValid()) {
    return m2.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m2.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m2);
}
function expandFormat(format2, locale2) {
  var i2 = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i2 >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(
      localFormattingTokens,
      replaceLongDateFormatTokens
    );
    localFormattingTokens.lastIndex = 0;
    i2 -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key2) {
  var format2 = this._longDateFormat[key2], formatUpper = this._longDateFormat[key2.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key2] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key2];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number) {
  return this._ordinal.replace("%d", number);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number, withoutSuffix, string, isFuture) {
  var output = this._relativeTime[string];
  return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {
  D: "date",
  dates: "date",
  date: "date",
  d: "day",
  days: "day",
  day: "day",
  e: "weekday",
  weekdays: "weekday",
  weekday: "weekday",
  E: "isoWeekday",
  isoweekdays: "isoWeekday",
  isoweekday: "isoWeekday",
  DDD: "dayOfYear",
  dayofyears: "dayOfYear",
  dayofyear: "dayOfYear",
  h: "hour",
  hours: "hour",
  hour: "hour",
  ms: "millisecond",
  milliseconds: "millisecond",
  millisecond: "millisecond",
  m: "minute",
  minutes: "minute",
  minute: "minute",
  M: "month",
  months: "month",
  month: "month",
  Q: "quarter",
  quarters: "quarter",
  quarter: "quarter",
  s: "second",
  seconds: "second",
  second: "second",
  gg: "weekYear",
  weekyears: "weekYear",
  weekyear: "weekYear",
  GG: "isoWeekYear",
  isoweekyears: "isoWeekYear",
  isoweekyear: "isoWeekYear",
  w: "week",
  weeks: "week",
  week: "week",
  W: "isoWeek",
  isoweeks: "isoWeek",
  isoweek: "isoWeek",
  y: "year",
  years: "year",
  year: "year"
};
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {
  date: 9,
  day: 11,
  weekday: 11,
  isoWeekday: 11,
  dayOfYear: 4,
  hour: 13,
  millisecond: 16,
  minute: 14,
  month: 8,
  quarter: 7,
  second: 15,
  weekYear: 1,
  isoWeekYear: 1,
  week: 5,
  isoWeek: 5,
  year: 1
};
function getPrioritizedUnits(unitsObj) {
  var units = [], u2;
  for (u2 in unitsObj) {
    if (hasOwnProp(unitsObj, u2)) {
      units.push({ unit: u2, priority: priorities[u2] });
    }
  }
  units.sort(function(a2, b2) {
    return a2.priority - b2.priority;
  });
  return units;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config2) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config2._strict, config2._locale);
}
function unescapeFormat(s2) {
  return regexEscape(
    s2.replace("\\", "").replace(
      /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
      function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }
    )
  );
}
function regexEscape(s2) {
  return s2.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
var tokens = {};
function addParseToken(token2, callback) {
  var i2, func = callback, tokenLen;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array) {
      array[callback] = toInt(input);
    };
  }
  tokenLen = token2.length;
  for (i2 = 0; i2 < tokenLen; i2++) {
    tokens[token2[i2]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array, config2, token3) {
    config2._w = config2._w || {};
    callback(input, config2._w, config2, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config2) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config2._a, config2, token2);
  }
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
addFormatToken("Y", 0, 0, function() {
  var y2 = this.year();
  return y2 <= 9999 ? zeroFill(y2, 4) : "+" + y2;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array) {
  array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array) {
  array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array) {
  array[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  if (!mom.isValid()) {
    return NaN;
  }
  var d2 = mom._d, isUTC = mom._isUTC;
  switch (unit) {
    case "Milliseconds":
      return isUTC ? d2.getUTCMilliseconds() : d2.getMilliseconds();
    case "Seconds":
      return isUTC ? d2.getUTCSeconds() : d2.getSeconds();
    case "Minutes":
      return isUTC ? d2.getUTCMinutes() : d2.getMinutes();
    case "Hours":
      return isUTC ? d2.getUTCHours() : d2.getHours();
    case "Date":
      return isUTC ? d2.getUTCDate() : d2.getDate();
    case "Day":
      return isUTC ? d2.getUTCDay() : d2.getDay();
    case "Month":
      return isUTC ? d2.getUTCMonth() : d2.getMonth();
    case "FullYear":
      return isUTC ? d2.getUTCFullYear() : d2.getFullYear();
    default:
      return NaN;
  }
}
function set$1(mom, unit, value) {
  var d2, isUTC, year, month, date;
  if (!mom.isValid() || isNaN(value)) {
    return;
  }
  d2 = mom._d;
  isUTC = mom._isUTC;
  switch (unit) {
    case "Milliseconds":
      return void (isUTC ? d2.setUTCMilliseconds(value) : d2.setMilliseconds(value));
    case "Seconds":
      return void (isUTC ? d2.setUTCSeconds(value) : d2.setSeconds(value));
    case "Minutes":
      return void (isUTC ? d2.setUTCMinutes(value) : d2.setMinutes(value));
    case "Hours":
      return void (isUTC ? d2.setUTCHours(value) : d2.setHours(value));
    case "Date":
      return void (isUTC ? d2.setUTCDate(value) : d2.setDate(value));
    // case 'Day': // Not real
    //    return void (isUTC ? d.setUTCDay(value) : d.setDay(value));
    // case 'Month': // Not used because we need to pass two variables
    //     return void (isUTC ? d.setUTCMonth(value) : d.setMonth(value));
    case "FullYear":
      break;
    // See below ...
    default:
      return;
  }
  year = value;
  month = mom.month();
  date = mom.date();
  date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
  void (isUTC ? d2.setUTCFullYear(year, month, date) : d2.setFullYear(year, month, date));
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i2, prioritizedLen = prioritized.length;
    for (i2 = 0; i2 < prioritizedLen; i2++) {
      this[prioritized[i2].unit](units[prioritized[i2].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
function mod(n2, x3) {
  return (n2 % x3 + x3) % x3;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o2) {
    var i2;
    for (i2 = 0; i2 < this.length; ++i2) {
      if (this[i2] === o2) {
        return i2;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addRegexToken("M", match1to2, match1to2NoLeadingZero);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array) {
  array[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array, config2, token2) {
  var month = config2._locale.monthsParse(input, token2, config2._strict);
  if (month != null) {
    array[MONTH] = month;
  } else {
    getParsingFlags(config2).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split(
  "_"
), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m2, format2) {
  if (!m2) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m2.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m2.month()];
}
function localeMonthsShort(m2, format2) {
  if (!m2) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m2.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m2.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i2, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i2 = 0; i2 < 12; ++i2) {
      mom = createUTC([2e3, i2]);
      this._shortMonthsParse[i2] = this.monthsShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._longMonthsParse[i2] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i2, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    if (strict && !this._longMonthsParse[i2]) {
      this._longMonthsParse[i2] = new RegExp(
        "^" + this.months(mom, "").replace(".", "") + "$",
        "i"
      );
      this._shortMonthsParse[i2] = new RegExp(
        "^" + this.monthsShort(mom, "").replace(".", "") + "$",
        "i"
      );
    }
    if (!strict && !this._monthsParse[i2]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (!strict && this._monthsParse[i2].test(monthName)) {
      return i2;
    }
  }
}
function setMonth(mom, value) {
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  var month = value, date = mom.date();
  date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
  void (mom._isUTC ? mom._d.setUTCMonth(month, date) : mom._d.setMonth(month, date));
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a2, b2) {
    return b2.length - a2.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, shortP, longP;
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    shortP = regexEscape(this.monthsShort(mom, ""));
    longP = regexEscape(this.months(mom, ""));
    shortPieces.push(shortP);
    longPieces.push(longP);
    mixedPieces.push(longP);
    mixedPieces.push(shortP);
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._monthsShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
}
function createDate(y2, m2, d2, h2, M, s2, ms) {
  var date;
  if (y2 < 100 && y2 >= 0) {
    date = new Date(y2 + 400, m2, d2, h2, M, s2, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y2);
    }
  } else {
    date = new Date(y2, m2, d2, h2, M, s2, ms);
  }
  return date;
}
function createUTCDate(y2) {
  var date, args;
  if (y2 < 100 && y2 >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y2 + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y2);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addRegexToken("w", match1to2, match1to2NoLeadingZero);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2, match1to2NoLeadingZero);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(
  ["w", "ww", "W", "WW"],
  function(input, week, config2, token2) {
    week[token2.substr(0, 1)] = toInt(input);
  }
);
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  // Sunday is the first day of the week.
  doy: 6
  // The week that contains Jan 6th is the first week of the year.
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config2, token2) {
  var weekday = config2._locale.weekdaysParse(input, token2, config2._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config2).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config2, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n2) {
  return ws.slice(n2, 7).concat(ws.slice(0, n2));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m2, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m2 && m2 !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m2 === true ? shiftWeekdays(weekdays, this._week.dow) : m2 ? weekdays[m2.day()] : weekdays;
}
function localeWeekdaysShort(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m2 ? this._weekdaysShort[m2.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m2) {
  return m2 === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m2 ? this._weekdaysMin[m2.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i2, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i2 = 0; i2 < 7; ++i2) {
      mom = createUTC([2e3, 1]).day(i2);
      this._minWeekdaysParse[i2] = this.weekdaysMin(
        mom,
        ""
      ).toLocaleLowerCase();
      this._shortWeekdaysParse[i2] = this.weekdaysShort(
        mom,
        ""
      ).toLocaleLowerCase();
      this._weekdaysParse[i2] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i2, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    if (strict && !this._fullWeekdaysParse[i2]) {
      this._fullWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._shortWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
      this._minWeekdaysParse[i2] = new RegExp(
        "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
        "i"
      );
    }
    if (!this._weekdaysParse[i2]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (!strict && this._weekdaysParse[i2].test(weekdayName)) {
      return i2;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = get(this, "Day");
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a2, b2) {
    return b2.length - a2.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, minp, shortp, longp;
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp(
    "^(" + longPieces.join("|") + ")",
    "i"
  );
  this._weekdaysShortStrictRegex = new RegExp(
    "^(" + shortPieces.join("|") + ")",
    "i"
  );
  this._weekdaysMinStrictRegex = new RegExp(
    "^(" + minPieces.join("|") + ")",
    "i"
  );
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(
      this.hours(),
      this.minutes(),
      lowercase
    );
  });
}
meridiem("a", true);
meridiem("A", false);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2, match1to2HasZero);
addRegexToken("h", match1to2, match1to2NoLeadingZero);
addRegexToken("k", match1to2, match1to2NoLeadingZero);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array, config2) {
  var kInput = toInt(input);
  array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array, config2) {
  config2._isPm = config2._locale.isPM(input);
  config2._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array, config2) {
  array[HOUR] = toInt(input);
  getParsingFlags(config2).bigHour = true;
});
addParseToken("hmm", function(input, array, config2) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config2).bigHour = true;
});
addParseToken("hmmss", function(input, array, config2) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config2).bigHour = true;
});
addParseToken("Hmm", function(input, array, config2) {
  var pos = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos));
  array[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array, config2) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array[HOUR] = toInt(input.substr(0, pos1));
  array[MINUTE] = toInt(input.substr(pos1, 2));
  array[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i2, minl = Math.min(arr1.length, arr2.length);
  for (i2 = 0; i2 < minl; i2 += 1) {
    if (arr1[i2] !== arr2[i2]) {
      return i2;
    }
  }
  return minl;
}
function normalizeLocale(key2) {
  return key2 ? key2.toLowerCase().replace("_", "-") : key2;
}
function chooseLocale(names) {
  var i2 = 0, j2, next, locale2, split;
  while (i2 < names.length) {
    split = normalizeLocale(names[i2]).split("-");
    j2 = split.length;
    next = normalizeLocale(names[i2 + 1]);
    next = next ? next.split("-") : null;
    while (j2 > 0) {
      locale2 = loadLocale(split.slice(0, j2).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j2 && commonPrefix(split, next) >= j2 - 1) {
        break;
      }
      j2--;
    }
    i2++;
  }
  return globalLocale;
}
function isLocaleNameSane(name2) {
  return !!(name2 && name2.match("^[^/\\\\]*$"));
}
function loadLocale(name2) {
  var oldLocale = null, aliasedRequire;
  if (locales[name2] === void 0 && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name2)) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name2);
      getSetGlobalLocale(oldLocale);
    } catch (e2) {
      locales[name2] = null;
    }
  }
  return locales[name2];
}
function getSetGlobalLocale(key2, values) {
  var data;
  if (key2) {
    if (isUndefined(values)) {
      data = getLocale(key2);
    } else {
      data = defineLocale(key2, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(
          "Locale " + key2 + " not found. Did you forget to load it?"
        );
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name2, config2) {
  if (config2 !== null) {
    var locale2, parentConfig = baseConfig;
    config2.abbr = name2;
    if (locales[name2] != null) {
      deprecateSimple(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      );
      parentConfig = locales[name2]._config;
    } else if (config2.parentLocale != null) {
      if (locales[config2.parentLocale] != null) {
        parentConfig = locales[config2.parentLocale]._config;
      } else {
        locale2 = loadLocale(config2.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config2.parentLocale]) {
            localeFamilies[config2.parentLocale] = [];
          }
          localeFamilies[config2.parentLocale].push({
            name: name2,
            config: config2
          });
          return null;
        }
      }
    }
    locales[name2] = new Locale(mergeConfigs(parentConfig, config2));
    if (localeFamilies[name2]) {
      localeFamilies[name2].forEach(function(x3) {
        defineLocale(x3.name, x3.config);
      });
    }
    getSetGlobalLocale(name2);
    return locales[name2];
  } else {
    delete locales[name2];
    return null;
  }
}
function updateLocale(name2, config2) {
  if (config2 != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name2] != null && locales[name2].parentLocale != null) {
      locales[name2].set(mergeConfigs(locales[name2]._config, config2));
    } else {
      tmpLocale = loadLocale(name2);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config2 = mergeConfigs(parentConfig, config2);
      if (tmpLocale == null) {
        config2.abbr = name2;
      }
      locale2 = new Locale(config2);
      locale2.parentLocale = locales[name2];
      locales[name2] = locale2;
    }
    getSetGlobalLocale(name2);
  } else {
    if (locales[name2] != null) {
      if (locales[name2].parentLocale != null) {
        locales[name2] = locales[name2].parentLocale;
        if (name2 === getSetGlobalLocale()) {
          getSetGlobalLocale(name2);
        }
      } else if (locales[name2] != null) {
        delete locales[name2];
      }
    }
  }
  return locales[name2];
}
function getLocale(key2) {
  var locale2;
  if (key2 && key2._locale && key2._locale._abbr) {
    key2 = key2._locale._abbr;
  }
  if (!key2) {
    return globalLocale;
  }
  if (!isArray(key2)) {
    locale2 = loadLocale(key2);
    if (locale2) {
      return locale2;
    }
    key2 = [key2];
  }
  return chooseLocale(key2);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m2) {
  var overflow, a2 = m2._a;
  if (a2 && getParsingFlags(m2).overflow === -2) {
    overflow = a2[MONTH] < 0 || a2[MONTH] > 11 ? MONTH : a2[DATE] < 1 || a2[DATE] > daysInMonth(a2[YEAR], a2[MONTH]) ? DATE : a2[HOUR] < 0 || a2[HOUR] > 24 || a2[HOUR] === 24 && (a2[MINUTE] !== 0 || a2[SECOND] !== 0 || a2[MILLISECOND] !== 0) ? HOUR : a2[MINUTE] < 0 || a2[MINUTE] > 59 ? MINUTE : a2[SECOND] < 0 || a2[SECOND] > 59 ? SECOND : a2[MILLISECOND] < 0 || a2[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m2)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m2)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m2)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m2).overflow = overflow;
  }
  return m2;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config2) {
  var i2, l2, string = config2._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
  if (match) {
    getParsingFlags(config2).iso = true;
    for (i2 = 0, l2 = isoDatesLen; i2 < l2; i2++) {
      if (isoDates[i2][1].exec(match[1])) {
        dateFormat = isoDates[i2][0];
        allowTime = isoDates[i2][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config2._isValid = false;
      return;
    }
    if (match[3]) {
      for (i2 = 0, l2 = isoTimesLen; i2 < l2; i2++) {
        if (isoTimes[i2][1].exec(match[3])) {
          timeFormat = (match[2] || " ") + isoTimes[i2][0];
          break;
        }
      }
      if (timeFormat == null) {
        config2._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config2._isValid = false;
      return;
    }
    if (match[4]) {
      if (tzRegex.exec(match[4])) {
        tzFormat = "Z";
      } else {
        config2._isValid = false;
        return;
      }
    }
    config2._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config2);
  } else {
    config2._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result.push(parseInt(secondStr, 10));
  }
  return result;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config2) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(
      parsedInput[0],
      parsedInput[1],
      parsedInput[2]
    ).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config2).weekdayMismatch = true;
      config2._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m2 = hm % 100, h2 = (hm - m2) / 100;
    return h2 * 60 + m2;
  }
}
function configFromRFC2822(config2) {
  var match = rfc2822.exec(preprocessRFC2822(config2._i)), parsedArray;
  if (match) {
    parsedArray = extractFromRFC2822Strings(
      match[4],
      match[3],
      match[2],
      match[5],
      match[6],
      match[7]
    );
    if (!checkWeekday(match[1], parsedArray, config2)) {
      return;
    }
    config2._a = parsedArray;
    config2._tzm = calculateOffset(match[8], match[9], match[10]);
    config2._d = createUTCDate.apply(null, config2._a);
    config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
    getParsingFlags(config2).rfc2822 = true;
  } else {
    config2._isValid = false;
  }
}
function configFromString(config2) {
  var matched = aspNetJsonRegex.exec(config2._i);
  if (matched !== null) {
    config2._d = /* @__PURE__ */ new Date(+matched[1]);
    return;
  }
  configFromISO(config2);
  if (config2._isValid === false) {
    delete config2._isValid;
  } else {
    return;
  }
  configFromRFC2822(config2);
  if (config2._isValid === false) {
    delete config2._isValid;
  } else {
    return;
  }
  if (config2._strict) {
    config2._isValid = false;
  } else {
    hooks.createFromInputFallback(config2);
  }
}
hooks.createFromInputFallback = deprecate(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function(config2) {
    config2._d = /* @__PURE__ */ new Date(config2._i + (config2._useUTC ? " UTC" : ""));
  }
);
function defaults(a2, b2, c2) {
  if (a2 != null) {
    return a2;
  }
  if (b2 != null) {
    return b2;
  }
  return c2;
}
function currentDateArray(config2) {
  var nowValue = new Date(hooks.now());
  if (config2._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config2) {
  var i2, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config2._d) {
    return;
  }
  currentDate = currentDateArray(config2);
  if (config2._w && config2._a[DATE] == null && config2._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config2);
  }
  if (config2._dayOfYear != null) {
    yearToUse = defaults(config2._a[YEAR], currentDate[YEAR]);
    if (config2._dayOfYear > daysInYear(yearToUse) || config2._dayOfYear === 0) {
      getParsingFlags(config2)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config2._dayOfYear);
    config2._a[MONTH] = date.getUTCMonth();
    config2._a[DATE] = date.getUTCDate();
  }
  for (i2 = 0; i2 < 3 && config2._a[i2] == null; ++i2) {
    config2._a[i2] = input[i2] = currentDate[i2];
  }
  for (; i2 < 7; i2++) {
    config2._a[i2] = input[i2] = config2._a[i2] == null ? i2 === 2 ? 1 : 0 : config2._a[i2];
  }
  if (config2._a[HOUR] === 24 && config2._a[MINUTE] === 0 && config2._a[SECOND] === 0 && config2._a[MILLISECOND] === 0) {
    config2._nextDay = true;
    config2._a[HOUR] = 0;
  }
  config2._d = (config2._useUTC ? createUTCDate : createDate).apply(
    null,
    input
  );
  expectedWeekday = config2._useUTC ? config2._d.getUTCDay() : config2._d.getDay();
  if (config2._tzm != null) {
    config2._d.setUTCMinutes(config2._d.getUTCMinutes() - config2._tzm);
  }
  if (config2._nextDay) {
    config2._a[HOUR] = 24;
  }
  if (config2._w && typeof config2._w.d !== "undefined" && config2._w.d !== expectedWeekday) {
    getParsingFlags(config2).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config2) {
  var w2, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w2 = config2._w;
  if (w2.GG != null || w2.W != null || w2.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(
      w2.GG,
      config2._a[YEAR],
      weekOfYear(createLocal(), 1, 4).year
    );
    week = defaults(w2.W, 1);
    weekday = defaults(w2.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config2._locale._week.dow;
    doy = config2._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w2.gg, config2._a[YEAR], curWeek.year);
    week = defaults(w2.w, curWeek.week);
    if (w2.d != null) {
      weekday = w2.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w2.e != null) {
      weekday = w2.e + dow;
      if (w2.e < 0 || w2.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config2)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config2)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config2._a[YEAR] = temp.year;
    config2._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config2) {
  if (config2._f === hooks.ISO_8601) {
    configFromISO(config2);
    return;
  }
  if (config2._f === hooks.RFC_2822) {
    configFromRFC2822(config2);
    return;
  }
  config2._a = [];
  getParsingFlags(config2).empty = true;
  var string = "" + config2._i, i2, parsedInput, tokens2, token2, skipped, stringLength = string.length, totalParsedInputLength = 0, era, tokenLen;
  tokens2 = expandFormat(config2._f, config2._locale).match(formattingTokens) || [];
  tokenLen = tokens2.length;
  for (i2 = 0; i2 < tokenLen; i2++) {
    token2 = tokens2[i2];
    parsedInput = (string.match(getParseRegexForToken(token2, config2)) || [])[0];
    if (parsedInput) {
      skipped = string.substr(0, string.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config2).unusedInput.push(skipped);
      }
      string = string.slice(
        string.indexOf(parsedInput) + parsedInput.length
      );
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config2).empty = false;
      } else {
        getParsingFlags(config2).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config2);
    } else if (config2._strict && !parsedInput) {
      getParsingFlags(config2).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config2).charsLeftOver = stringLength - totalParsedInputLength;
  if (string.length > 0) {
    getParsingFlags(config2).unusedInput.push(string);
  }
  if (config2._a[HOUR] <= 12 && getParsingFlags(config2).bigHour === true && config2._a[HOUR] > 0) {
    getParsingFlags(config2).bigHour = void 0;
  }
  getParsingFlags(config2).parsedDateParts = config2._a.slice(0);
  getParsingFlags(config2).meridiem = config2._meridiem;
  config2._a[HOUR] = meridiemFixWrap(
    config2._locale,
    config2._a[HOUR],
    config2._meridiem
  );
  era = getParsingFlags(config2).era;
  if (era !== null) {
    config2._a[YEAR] = config2._locale.erasConvertYear(era, config2._a[YEAR]);
  }
  configFromArray(config2);
  checkOverflow(config2);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config2) {
  var tempConfig, bestMoment, scoreToBeat, i2, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config2._f.length;
  if (configfLen === 0) {
    getParsingFlags(config2).invalidFormat = true;
    config2._d = /* @__PURE__ */ new Date(NaN);
    return;
  }
  for (i2 = 0; i2 < configfLen; i2++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config2);
    if (config2._useUTC != null) {
      tempConfig._useUTC = config2._useUTC;
    }
    tempConfig._f = config2._f[i2];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config2, bestMoment || tempConfig);
}
function configFromObject(config2) {
  if (config2._d) {
    return;
  }
  var i2 = normalizeObjectUnits(config2._i), dayOrDate = i2.day === void 0 ? i2.date : i2.day;
  config2._a = map(
    [i2.year, i2.month, dayOrDate, i2.hour, i2.minute, i2.second, i2.millisecond],
    function(obj) {
      return obj && parseInt(obj, 10);
    }
  );
  configFromArray(config2);
}
function createFromConfig(config2) {
  var res = new Moment(checkOverflow(prepareConfig(config2)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config2) {
  var input = config2._i, format2 = config2._f;
  config2._locale = config2._locale || getLocale(config2._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config2._i = input = config2._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config2._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config2);
  } else if (format2) {
    configFromStringAndFormat(config2);
  } else {
    configFromInput(config2);
  }
  if (!isValid(config2)) {
    config2._d = null;
  }
  return config2;
}
function configFromInput(config2) {
  var input = config2._i;
  if (isUndefined(input)) {
    config2._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config2._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config2);
  } else if (isArray(input)) {
    config2._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config2);
  } else if (isObject(input)) {
    configFromObject(config2);
  } else if (isNumber(input)) {
    config2._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config2);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c2 = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c2._isAMomentObject = true;
  c2._useUTC = c2._isUTC = isUTC;
  c2._l = locale2;
  c2._i = input;
  c2._f = format2;
  c2._strict = strict;
  return createFromConfig(c2);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate(
  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other2 = createLocal.apply(null, arguments);
    if (this.isValid() && other2.isValid()) {
      return other2 < this ? this : other2;
    } else {
      return createInvalid();
    }
  }
), prototypeMax = deprecate(
  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
  function() {
    var other2 = createLocal.apply(null, arguments);
    if (this.isValid() && other2.isValid()) {
      return other2 > this ? this : other2;
    } else {
      return createInvalid();
    }
  }
);
function pickBy(fn, moments) {
  var res, i2;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i2 = 1; i2 < moments.length; ++i2) {
    if (!moments[i2].isValid() || moments[i2][fn](res)) {
      res = moments[i2];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +/* @__PURE__ */ new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m2) {
  var key2, unitHasDecimal = false, i2, orderLen = ordering.length;
  for (key2 in m2) {
    if (hasOwnProp(m2, key2) && !(indexOf.call(ordering, key2) !== -1 && (m2[key2] == null || !isNaN(m2[key2])))) {
      return false;
    }
  }
  for (i2 = 0; i2 < orderLen; ++i2) {
    if (m2[ordering[i2]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m2[ordering[i2]]) !== toInt(m2[ordering[i2]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + // 1000
  minutes2 * 6e4 + // 1000 * 60
  hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number) {
  if (number < 0) {
    return Math.round(-1 * number) * -1;
  } else {
    return Math.round(number);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i2;
  for (i2 = 0; i2 < len; i2++) {
    if (toInt(array1[i2]) !== toInt(array2[i2])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array, config2) {
  config2._useUTC = true;
  config2._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
  var matches = (string || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m2) {
  return -Math.round(m2._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(
          this,
          createDuration(input - offset2, "m"),
          1,
          false
        );
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c2 = {}, other2;
  copyConfig(c2, this);
  c2 = prepareConfig(c2);
  if (c2._a) {
    other2 = c2._isUTC ? createUTC(c2._a) : createLocal(c2._a);
    this._isDSTShifted = this.isValid() && compareArrays(c2._a, other2.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key2) {
  var duration = input, match = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key2) {
      duration[key2] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match = aspNetRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match[DATE]) * sign2,
      h: toInt(match[HOUR]) * sign2,
      m: toInt(match[MINUTE]) * sign2,
      s: toInt(match[SECOND]) * sign2,
      ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2
      // the millisecond decimal point is included in the match
    };
  } else if (match = isoRegex.exec(input)) {
    sign2 = match[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match[2], sign2),
      M: parseIso(match[3], sign2),
      w: parseIso(match[4], sign2),
      d: parseIso(match[5], sign2),
      h: parseIso(match[6], sign2),
      m: parseIso(match[7], sign2),
      s: parseIso(match[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(
      createLocal(duration.from),
      createLocal(duration.to)
    );
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other2) {
  var res = {};
  res.months = other2.month() - base.month() + (other2.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other2)) {
    --res.months;
  }
  res.milliseconds = +other2 - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other2) {
  var res;
  if (!(base.isValid() && other2.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other2 = cloneWithOffset(other2, base);
  if (base.isBefore(other2)) {
    res = positiveMomentsDifference(base, other2);
  } else {
    res = positiveMomentsDifference(other2, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name2) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(
        name2,
        "moment()." + name2 + "(period, number) is deprecated. Please use moment()." + name2 + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
      );
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i2, property, propertyLen = properties.length;
  for (i2 = 0; i2 < propertyLen; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(
    output || this.localeData().calendar(format2, this, createLocal(now2))
  );
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    // 1000
    case "minute":
      output = (this - that) / 6e4;
      break;
    // 1000 * 60
    case "hour":
      output = (this - that) / 36e5;
      break;
    // 1000 * 60 * 60
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    // 1000 * 60 * 60 * 24, negate dst
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    // 1000 * 60 * 60 * 24 * 7, negate dst
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a2, b2) {
  if (a2.date() < b2.date()) {
    return -monthDiff(b2, a2);
  }
  var wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month()), anchor = a2.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b2 - anchor < 0) {
    anchor2 = a2.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b2 - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a2.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b2 - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m2 = utc ? this.clone().utc() : this;
  if (m2.year() < 0 || m2.year() > 9999) {
    return formatMoment(
      m2,
      utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
    );
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m2, "Z"));
    }
  }
  return formatMoment(
    m2,
    utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
  );
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key2) {
  var newLocaleData;
  if (key2 === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key2);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function(key2) {
    if (key2 === void 0) {
      return this.localeData();
    } else {
      return this.locale(key2);
    }
  }
);
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y2, m2, d2) {
  if (y2 < 100 && y2 >= 0) {
    return new Date(y2 + 400, m2, d2) - MS_PER_400_YEARS;
  } else {
    return new Date(y2, m2, d2).valueOf();
  }
}
function utcStartOfDate(y2, m2, d2) {
  if (y2 < 100 && y2 >= 0) {
    return Date.UTC(y2 + 400, m2, d2) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y2, m2, d2);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3,
        1
      );
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday()
      );
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1)
      );
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      );
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(
        this.year(),
        this.month() - this.month() % 3 + 3,
        1
      ) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - this.weekday() + 7
      ) - 1;
      break;
    case "isoWeek":
      time = startOfDate(
        this.year(),
        this.month(),
        this.date() - (this.isoWeekday() - 1) + 7
      ) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(
        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
        MS_PER_HOUR
      ) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m2 = this;
  return [
    m2.year(),
    m2.month(),
    m2.date(),
    m2.hour(),
    m2.minute(),
    m2.second(),
    m2.millisecond()
  ];
}
function toObject() {
  var m2 = this;
  return {
    years: m2.year(),
    months: m2.month(),
    date: m2.date(),
    hours: m2.hours(),
    minutes: m2.minutes(),
    seconds: m2.seconds(),
    milliseconds: m2.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(
  ["N", "NN", "NNN", "NNNN", "NNNNN"],
  function(input, array, config2, token2) {
    var era = config2._locale.erasParse(input, token2, config2._strict);
    if (era) {
      getParsingFlags(config2).era = era;
    } else {
      getParsingFlags(config2).invalidEra = input;
    }
  }
);
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array, config2, token2) {
  var match;
  if (config2._locale._eraYearOrdinalRegex) {
    match = input.match(config2._locale._eraYearOrdinalRegex);
  }
  if (config2._locale.eraYearOrdinalParse) {
    array[YEAR] = config2._locale.eraYearOrdinalParse(input, match);
  } else {
    array[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m2, format2) {
  var i2, l2, date, eras = this._eras || getLocale("en")._eras;
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    switch (typeof eras[i2].since) {
      case "string":
        date = hooks(eras[i2].since).startOf("day");
        eras[i2].since = date.valueOf();
        break;
    }
    switch (typeof eras[i2].until) {
      case "undefined":
        eras[i2].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i2].until).startOf("day").valueOf();
        eras[i2].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i2, l2, eras = this.eras(), name2, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    name2 = eras[i2].name.toUpperCase();
    abbr = eras[i2].abbr.toUpperCase();
    narrow = eras[i2].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i2];
          }
          break;
        case "NNNN":
          if (name2 === eraName) {
            return eras[i2];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i2];
          }
          break;
      }
    } else if ([name2, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i2];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].name;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].narrow;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i2, l2, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].abbr;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i2, l2, dir, val, eras = this.localeData().eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    dir = eras[i2].since <= eras[i2].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until || eras[i2].until <= val && val <= eras[i2].since) {
      return (this.year() - hooks(eras[i2].since).year()) * dir + eras[i2].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i2, l2, erasName, erasAbbr, erasNarrow, eras = this.eras();
  for (i2 = 0, l2 = eras.length; i2 < l2; ++i2) {
    erasName = regexEscape(eras[i2].name);
    erasAbbr = regexEscape(eras[i2].abbr);
    erasNarrow = regexEscape(eras[i2].narrow);
    namePieces.push(erasName);
    abbrPieces.push(erasAbbr);
    narrowPieces.push(erasNarrow);
    mixedPieces.push(erasName);
    mixedPieces.push(erasAbbr);
    mixedPieces.push(erasNarrow);
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp(
    "^(" + narrowPieces.join("|") + ")",
    "i"
  );
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(
  ["gggg", "ggggg", "GGGG", "GGGGG"],
  function(input, week, config2, token2) {
    week[token2.substr(0, 2)] = toInt(input);
  }
);
addWeekParseToken(["gg", "GG"], function(input, week, config2, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.week(),
    this.weekday() + this.localeData()._week.dow,
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(
    this,
    input,
    this.isoWeek(),
    this.isoWeekday(),
    1,
    4
  );
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addRegexToken("Q", match1);
addParseToken("Q", function(input, array) {
  array[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addRegexToken("D", match1to2, match1to2NoLeadingZero);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array) {
  array[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array, config2) {
  config2._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round(
    (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
  ) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addRegexToken("m", match1to2, match1to2HasZero);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addRegexToken("s", match1to2, match1to2HasZero);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array) {
  array[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate(
  "dates accessor is deprecated. Use date instead.",
  getSetDayOfMonth
);
proto.months = deprecate(
  "months accessor is deprecated. Use month instead",
  getSetMonth
);
proto.years = deprecate(
  "years accessor is deprecated. Use year instead",
  getSetYear
);
proto.zone = deprecate(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  getSetZone
);
proto.isDSTShifted = deprecate(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  isDaylightSavingTimeShifted
);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string) {
  return string;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index, field) {
  if (isNumber(format2)) {
    index = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index != null) {
    return get$1(format2, index, field, "month");
  }
  var i2, out = [];
  for (i2 = 0; i2 < 12; i2++) {
    out[i2] = get$1(format2, i2, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift2 = localeSorted ? locale2._week.dow : 0, i2, out = [];
  if (index != null) {
    return get$1(format2, (index + shift2) % 7, field, "day");
  }
  for (i2 = 0; i2 < 7; i2++) {
    out[i2] = get$1(format2, (i2 + shift2) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index) {
  return listMonthsImpl(format2, index, "months");
}
function listMonthsShort(format2, index) {
  return listMonthsImpl(format2, index, "monthsShort");
}
function listWeekdays(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number) {
    var b2 = number % 10, output = toInt(number % 100 / 10) === 1 ? "th" : b2 === 1 ? "st" : b2 === 2 ? "nd" : b2 === 3 ? "rd" : "th";
    return number + output;
  }
});
hooks.lang = deprecate(
  "moment.lang is deprecated. Use moment.locale instead.",
  getSetGlobalLocale
);
hooks.langData = deprecate(
  "moment.langData is deprecated. Use moment.localeData instead.",
  getLocale
);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other2 = createDuration(input, value);
  duration._milliseconds += direction * other2._milliseconds;
  duration._days += direction * other2._days;
  duration._months += direction * other2._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number) {
  if (number < 0) {
    return Math.floor(number);
  } else {
    return Math.ceil(number);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      // Math.floor prevents floating point math errors here
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name2) {
  return function() {
    return this.isValid() ? this._data[name2] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  // a few seconds to seconds
  s: 45,
  // seconds to minute
  m: 45,
  // minutes to hour
  h: 22,
  // hours to day
  d: 26,
  // days to month/week
  w: null,
  // weeks to month
  M: 11
  // months to year
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a2 = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a2 = a2 || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a2 = a2 || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a2[2] = withoutSuffix;
  a2[3] = +posNegDuration > 0;
  a2[4] = locale2;
  return substituteTimeAgo.apply(null, a2);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x3) {
  return (x3 > 0) - (x3 < 0) || +x3;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s2, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s2 = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s2 + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  toISOString$1
);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array, config2) {
  config2._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array, config2) {
  config2._d = new Date(toInt(input));
});
hooks.version = "2.30.1";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  // <input type="datetime-local" step="0.001" />
  DATE: "YYYY-MM-DD",
  // <input type="date" />
  TIME: "HH:mm",
  // <input type="time" />
  TIME_SECONDS: "HH:mm:ss",
  // <input type="time" step="1" />
  TIME_MS: "HH:mm:ss.SSS",
  // <input type="time" step="0.001" />
  WEEK: "GGGG-[W]WW",
  // <input type="week" />
  MONTH: "YYYY-MM"
  // <input type="month" />
};
function plural(word, num) {
  var forms = word.split("_");
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2];
}
function relativeTimeWithPlural(number, withoutSuffix, key2) {
  var format2 = {
    ss: withoutSuffix ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
    mm: withoutSuffix ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
    hh: withoutSuffix ? "година_години_годин" : "годину_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років"
  };
  if (key2 === "m") {
    return withoutSuffix ? "хвилина" : "хвилину";
  } else if (key2 === "h") {
    return withoutSuffix ? "година" : "годину";
  } else {
    return number + " " + plural(format2[key2], +number);
  }
}
function weekdaysCaseReplace(m2, format2) {
  var weekdays = {
    nominative: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split(
      "_"
    ),
    accusative: "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split(
      "_"
    ),
    genitive: "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split(
      "_"
    )
  }, nounCase;
  if (m2 === true) {
    return weekdays["nominative"].slice(1, 7).concat(weekdays["nominative"].slice(0, 1));
  }
  if (!m2) {
    return weekdays["nominative"];
  }
  nounCase = /(\[[ВвУу]\]) ?dddd/.test(format2) ? "accusative" : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(format2) ? "genitive" : "nominative";
  return weekdays[nounCase][m2.day()];
}
function processHoursFunction(str) {
  return function() {
    return str + "о" + (this.hours() === 11 ? "б" : "") + "] LT";
  };
}
hooks.defineLocale("uk", {
  months: {
    format: "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split(
      "_"
    ),
    standalone: "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split(
      "_"
    )
  },
  monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split(
    "_"
  ),
  weekdays: weekdaysCaseReplace,
  weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm"
  },
  calendar: {
    sameDay: processHoursFunction("[Сьогодні "),
    nextDay: processHoursFunction("[Завтра "),
    lastDay: processHoursFunction("[Вчора "),
    nextWeek: processHoursFunction("[У] dddd ["),
    lastWeek: function() {
      switch (this.day()) {
        case 0:
        case 3:
        case 5:
        case 6:
          return processHoursFunction("[Минулої] dddd [").call(this);
        case 1:
        case 2:
        case 4:
          return processHoursFunction("[Минулого] dddd [").call(this);
      }
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "за %s",
    past: "%s тому",
    s: "декілька секунд",
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: "годину",
    hh: relativeTimeWithPlural,
    d: "день",
    dd: relativeTimeWithPlural,
    M: "місяць",
    MM: relativeTimeWithPlural,
    y: "рік",
    yy: relativeTimeWithPlural
  },
  // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
  meridiemParse: /ночі|ранку|дня|вечора/,
  isPM: function(input) {
    return /^(дня|вечора)$/.test(input);
  },
  meridiem: function(hour, minute, isLower) {
    if (hour < 4) {
      return "ночі";
    } else if (hour < 12) {
      return "ранку";
    } else if (hour < 17) {
      return "дня";
    } else {
      return "вечора";
    }
  },
  dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
  ordinal: function(number, period) {
    switch (period) {
      case "M":
      case "d":
      case "DDD":
      case "w":
      case "W":
        return number + "-й";
      case "D":
        return number + "-го";
      default:
        return number;
    }
  },
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 7
    // The week that contains Jan 7th is the first week of the year.
  }
});
const helper = {
  install(app) {
    app.config.globalProperties.$formatSerial = (value, length = 5) => {
      if (value === null || value === void 0 || value === "")
        return "";
      return String(value).padStart(length, "0");
    };
    app.config.globalProperties.$fomatterNumber = (value, minDecimalPart = 0) => {
      if (typeof value !== "number" || isNaN(value)) {
        return 0;
      }
      let number = parseFloat(value).toFixed(2);
      const [integerPart, decimalPart] = number.split(".");
      number = parseInt(integerPart).toLocaleString("uk-UA");
      if (decimalPart && parseInt(decimalPart) !== 0) {
        number += `.${decimalPart}`;
      } else if (minDecimalPart !== 0) {
        number += `.00`;
      }
      return number.replace(".", ",");
    };
    app.config.globalProperties.$fomatterData = (date, mask = "DD.MM.YY") => {
      if (date === "") return "";
      return date ? hooks(new Date(date)).locale("uk").format(mask) : null;
    };
  }
};
createServer(
  (page2) => createInertiaApp({
    page: page2,
    render: serverRenderer_cjs_prodExports.renderToString,
    title: (title) => title,
    resolve: (name2) => resolvePageComponent(
      `./Pages/${name2}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Admin/Commerce/Categories/Create.vue": () => import("./assets/Create-DJClu1On.js"), "./Pages/Admin/Commerce/Categories/Edit.vue": () => import("./assets/Edit-DMJAdouy.js"), "./Pages/Admin/Commerce/Categories/Index.vue": () => import("./assets/Index-BnS-Bgct.js"), "./Pages/Admin/Commerce/Categories/Partials/DataForm.vue": () => import("./assets/DataForm-COnNiCFZ.js"), "./Pages/Admin/Commerce/Categories/Partials/DataTable.vue": () => import("./assets/DataTable-M5di_zeq.js"), "./Pages/Admin/Commerce/Categories/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-BnWxQk3H.js"), "./Pages/Admin/Commerce/Categories/Partials/SEOForm.vue": () => import("./assets/SEOForm-CQDNt9eV.js"), "./Pages/Admin/Commerce/Categories/Show.vue": () => import("./assets/Show-a_-vvodi.js"), "./Pages/Admin/Commerce/Items/Create.vue": () => import("./assets/Create-CYUU9Jko.js"), "./Pages/Admin/Commerce/Items/Edit.vue": () => import("./assets/Edit-DUYMGGaN.js"), "./Pages/Admin/Commerce/Items/Index.vue": () => import("./assets/Index-D0_AVwER.js"), "./Pages/Admin/Commerce/Items/Partials/DataForm.vue": () => import("./assets/DataForm-D8EvEaas.js"), "./Pages/Admin/Commerce/Items/Partials/DataTable.vue": () => import("./assets/DataTable-DupyeKm5.js"), "./Pages/Admin/Commerce/Items/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-Dqpyucw_.js"), "./Pages/Admin/Commerce/Items/Partials/MediaForm.vue": () => import("./assets/MediaForm-Qqh1aNzJ.js"), "./Pages/Admin/Commerce/Items/Partials/SEOForm.vue": () => import("./assets/SEOForm-ByND2QpS.js"), "./Pages/Admin/Commerce/Items/Show.vue": () => import("./assets/Show-DJRWmuJ-.js"), "./Pages/Admin/Commerce/Manufacturers/Create.vue": () => import("./assets/Create-Cca1fZxY.js"), "./Pages/Admin/Commerce/Manufacturers/Edit.vue": () => import("./assets/Edit-CJKmDZNT.js"), "./Pages/Admin/Commerce/Manufacturers/Index.vue": () => import("./assets/Index-CwBQi-Kz.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/DataForm.vue": () => import("./assets/DataForm-Dge5wuvW.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/DataTable.vue": () => import("./assets/DataTable-CwsDNAny.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-DjenY2qr.js"), "./Pages/Admin/Commerce/Manufacturers/Partials/SEOForm.vue": () => import("./assets/SEOForm-CBLih2-J.js"), "./Pages/Admin/Commerce/Manufacturers/Show.vue": () => import("./assets/Show-Dm21z19N.js"), "./Pages/Admin/Commerce/Orders/Create.vue": () => import("./assets/Create-BQFHNMvW.js"), "./Pages/Admin/Commerce/Orders/Edit.vue": () => import("./assets/Edit-ByHXykiV.js"), "./Pages/Admin/Commerce/Orders/Index.vue": () => import("./assets/Index-D8ALlJ0L.js"), "./Pages/Admin/Commerce/Orders/Partials/DataForm.vue": () => import("./assets/DataForm-CHnfIpJK.js"), "./Pages/Admin/Commerce/Orders/Partials/DataTable.vue": () => import("./assets/DataTable-BzLDc7pL.js"), "./Pages/Admin/Commerce/Orders/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-9N_H0Q63.js"), "./Pages/Admin/Dashboard/Index.vue": () => import("./assets/Index-CTpRuxPF.js"), "./Pages/Admin/Dashboard/Menus/Index.vue": () => import("./assets/Index-nhBfiI0y.js"), "./Pages/Admin/Dashboard/Menus/Partials/MenuItem.vue": () => import("./assets/MenuItem-BUeunemV.js"), "./Pages/Admin/Dashboard/Pages/Form.vue": () => import("./assets/Form-BKQ897y1.js"), "./Pages/Admin/Dashboard/Pages/Index.vue": () => import("./assets/Index-CmZI2DQn.js"), "./Pages/Admin/Dashboard/Pages/Partials/DataForm.vue": () => import("./assets/DataForm-weu3pX9I.js"), "./Pages/Admin/Dashboard/Pages/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-GXaO3uRS.js"), "./Pages/Admin/Dashboard/Pages/Partials/SeoForm.vue": () => import("./assets/SeoForm-C3dSPWvd.js"), "./Pages/Admin/Dashboard/Pages/Show.vue": () => import("./assets/Show-BvIyNEXI.js"), "./Pages/Admin/Dashboard/Users/Create.vue": () => import("./assets/Create-DwHEbjh5.js"), "./Pages/Admin/Dashboard/Users/Edit.vue": () => import("./assets/Edit-BQra-2rg.js"), "./Pages/Admin/Dashboard/Users/Index.vue": () => import("./assets/Index-BIR8oHPs.js"), "./Pages/Admin/Settings/PaymentMethods/Create.vue": () => import("./assets/Create-CXP1VSir.js"), "./Pages/Admin/Settings/PaymentMethods/Edit.vue": () => import("./assets/Edit-GGW6wAPP.js"), "./Pages/Admin/Settings/PaymentMethods/Index.vue": () => import("./assets/Index-CSaH94ou.js"), "./Pages/Admin/Settings/PaymentMethods/Partials/DataForm.vue": () => import("./assets/DataForm-CH0dM7yX.js"), "./Pages/Admin/Settings/PaymentMethods/Partials/DataTable.vue": () => import("./assets/DataTable-YhWwDhTL.js"), "./Pages/Admin/Settings/PaymentMethods/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-ClbxYT1A.js"), "./Pages/Admin/Settings/PaymentMethods/Partials/TranslationContent.vue": () => import("./assets/TranslationContent-CNCzXwQU.js"), "./Pages/Admin/Settings/Settings.vue": () => import("./assets/Settings-BBlPIsvA.js"), "./Pages/Admin/Settings/Shippings/Edit.vue": () => import("./assets/Edit-D7r-jWhO.js"), "./Pages/Admin/Settings/Shippings/Index.vue": () => import("./assets/Index-TKx1nVXo.js"), "./Pages/Admin/Settings/Shippings/Partials/DataTable.vue": () => import("./assets/DataTable-p9O7Adf-.js"), "./Pages/Admin/Settings/Translations/Index.vue": () => import("./assets/Index-DTjN_O4Q.js"), "./Pages/Admin/Settings/Versions/Index.vue": () => import("./assets/Index-BrVK3bog.js"), "./Pages/Admin/Settings/Warehouses/Create.vue": () => import("./assets/Create-CedjAxS2.js"), "./Pages/Admin/Settings/Warehouses/Edit.vue": () => import("./assets/Edit-DeLVnqTN.js"), "./Pages/Admin/Settings/Warehouses/Index.vue": () => import("./assets/Index-BAx-4P5V.js"), "./Pages/Admin/Settings/Warehouses/Partials/DataTable.vue": () => import("./assets/DataTable-DcLUTkDh.js"), "./Pages/Admin/Users/Edit.vue": () => import("./assets/Edit-x2jTqcD0.js"), "./Pages/Admin/Users/EditЩдв.vue": () => import("./assets/EditЩдв-gt6McU7K.js"), "./Pages/Admin/Users/Partials/GeneralForm.vue": () => import("./assets/GeneralForm-BXx2MH9p.js"), "./Pages/Admin/Users/Show.vue": () => import("./assets/Show-C5zi-V9N.js"), "./Pages/Auth/AuthUserForm.vue": () => import("./assets/AuthUserForm-DkPkeCkm.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-BHPNm0yg.js"), "./Pages/Public/Account/Index.vue": () => import("./assets/Index-Cg4sTK3I.js"), "./Pages/Public/Commerce/Cart.vue": () => import("./assets/Cart-QaDIvTL0.js"), "./Pages/Public/Commerce/CategoryShow.vue": () => import("./assets/CategoryShow-B6Lph5Gk.js"), "./Pages/Public/Commerce/Checkout/Index.vue": () => import("./assets/Index-BlbKE3Zk.js"), "./Pages/Public/Commerce/Checkout/Partials/OrderSummary.vue": () => import("./assets/OrderSummary-CLW2Cav3.js"), "./Pages/Public/Commerce/Checkout/Steps/StepContact.vue": () => import("./assets/StepContact-LxNsNWtk.js"), "./Pages/Public/Commerce/Checkout/Steps/StepDelivery.vue": () => import("./assets/StepDelivery-B5h8bVzP.js"), "./Pages/Public/Commerce/Checkout/Steps/StepPayment.vue": () => import("./assets/StepPayment-EvwzxruV.js"), "./Pages/Public/Commerce/Checkout/layout/DefaultCheckoutLayout.vue": () => import("./assets/DefaultCheckoutLayout-BfVICHWE.js"), "./Pages/Public/Commerce/CheckoutOld.vue": () => import("./assets/CheckoutOld-2jr4-Vni.js"), "./Pages/Public/Commerce/Partials/ContactInfo.vue": () => import("./assets/ContactInfo-3Uskj9ij.js"), "./Pages/Public/Commerce/Partials/PaymentMethods.vue": () => import("./assets/PaymentMethods-BHqJDXf_.js"), "./Pages/Public/Commerce/Partials/ShippingInfo.vue": () => import("./assets/ShippingInfo-kTgVxNJa.js"), "./Pages/Public/Commerce/View.vue": () => import("./assets/View-By8lzDlM.js"), "./Pages/Public/Home.vue": () => import("./assets/Home-6tNJX_th.js"), "./Pages/Public/Index.vue": () => import("./assets/Index-BpcH2xP_.js"), "./Pages/Public/PageShow.vue": () => import("./assets/PageShow-CMq4qcC4.js"), "./Pages/Public/Search.vue": () => import("./assets/Search-DVeGeU-u.js") })
    ),
    setup({ App: App2, props, plugin: plugin2 }) {
      const pinia = createPinia();
      return createSSRApp({ render: () => h$2(App2, props) }).use(plugin2).use(U, {
        ...page2.props.ziggy,
        location: new URL(page2.props.ziggy.location)
      }).use(i18nVue, {
        resolve: (lang2) => {
          const langs = /* @__PURE__ */ Object.assign({
            "../../lang/de.json": __vite_glob_1_0,
            "../../lang/en.json": __vite_glob_1_1,
            "../../lang/es.json": __vite_glob_1_2,
            "../../lang/php_de.json": __vite_glob_1_3,
            "../../lang/php_en.json": __vite_glob_1_4,
            "../../lang/php_es.json": __vite_glob_1_5,
            "../../lang/php_pl.json": __vite_glob_1_6,
            "../../lang/php_ru.json": __vite_glob_1_7,
            "../../lang/php_uk.json": __vite_glob_1_8,
            "../../lang/pl.json": __vite_glob_1_9,
            "../../lang/ru.json": __vite_glob_1_10,
            "../../lang/uk.json": __vite_glob_1_11
          });
          return langs[`../../lang/${lang2}.json`].default;
        }
      }).use(pinia).use(Gt).use(helper).component("Head", head_default).component("Link", link_default);
    }
  })
);
export {
  useForm as a,
  hooks as b,
  loadLanguageAsync as c,
  head_default as h,
  link_default as l,
  trans as t,
  usePage as u
};
