const DATA = [
  { tag: "Preamble", title: "Preamble", text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America." },
  { tag: "Article I", title: "Legislative Branch", text: "All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives." },
  { tag: "Article II", title: "Executive Branch", text: "The executive Power shall be vested in a President of the United States of America." },
  { tag: "Article III", title: "Judicial Branch", text: "The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish." },
  { tag: "Article IV", title: "The States", text: "Full Faith and Credit shall be given in each State to the public Acts, Records, and judicial Proceedings of every other State." },
  { tag: "Article V", title: "Amendment", text: "The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution..." },
  { tag: "Article VI", title: "Supremacy", text: "This Constitution, and the Laws of the United States which shall be made in Pursuance thereof... shall be the supreme Law of the Land." },
  { tag: "Article VII", title: "Ratification", text: "The Ratification of the Conventions of nine States, shall be sufficient for the Establishment of this Constitution between the States so ratifying the Same." },
  { tag: "Amendment I", title: "Religion, speech, press, assembly, petition", text: "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances." },
  { tag: "Amendment II", title: "Bear arms", text: "A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed." },
  { tag: "Amendment III", title: "Quartering", text: "No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law." },
  { tag: "Amendment IV", title: "Search and seizure", text: "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated..." },
  { tag: "Amendment V", title: "Due process, takings, self-incrimination", text: "No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury... nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation." },
  { tag: "Amendment VI", title: "Criminal trial rights", text: "In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed..." },
  { tag: "Amendment VII", title: "Civil jury", text: "In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved..." },
  { tag: "Amendment VIII", title: "Bail and punishment", text: "Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted." },
  { tag: "Amendment IX", title: "Unenumerated rights", text: "The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people." },
  { tag: "Amendment X", title: "Reserved powers", text: "The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people." }
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function render(filter) {
  try {
    const list = document.getElementById("list");
    if (!list) return;
    const f = String(filter || "").slice(0, 80).toLowerCase();
    const rows = DATA.filter((d) =>
      (d.tag + " " + d.title + " " + d.text).toLowerCase().includes(f)
    );
    list.innerHTML = rows.length
      ? rows.map((d) => "<article><p class=\"tag\">" + escapeHtml(d.tag) + "</p><h2>" + escapeHtml(d.title) + "</h2><p>" + escapeHtml(d.text) + "</p></article>").join("")
      : "<p>No match. Try speech, search, or jury.</p>";
  } catch (err) {
    const list = document.getElementById("list");
    if (list) list.textContent = "Could not render. Reload the page.";
  }
}

try {
  const q = document.getElementById("q");
  if (q) q.addEventListener("input", (e) => render(e.target.value));
  render("");
} catch (err) {
  document.body.appendChild(document.createTextNode("App failed to start."));
}
