import { Document, Page, Text, View, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";
import { JSONResume, translations } from "./types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000000",
  },
  header: {
    marginBottom: 25,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginBottom: 4,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  contactText: {
    fontSize: 9,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgb(0, 79, 144)",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(0, 79, 144)",
    paddingBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  entry: {
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "center",
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#1a1a1a",
  },
  entryDate: {
    fontSize: 9,
    color: "#666",
  },
  entrySubtitle: {
    fontSize: 9,
    color: "#444",
    marginBottom: 2,
  },
  entryLocation: {
    fontSize: 9,
    color: "#888",
    marginBottom: 4,
  },
  highlight: {
    fontSize: 9,
    color: "#444",
    marginLeft: 8,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 6,
  },
  skillName: {
    fontWeight: "bold",
    fontSize: 9,
    marginRight: 4,
  },
  skillTag: {
    fontSize: 8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    color: "#444",
  },
  summary: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.5,
    textAlign: "justify",
  },
  projectCard: {
    backgroundColor: "#fafafa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
});

interface PDFDocumentProps {
  cv: JSONResume;
  language: "en" | "es";
}

export function PDFDocument({ cv, language }: PDFDocumentProps) {
  const t = translations[language];

  const formatDate = (dateStr: string): string => {
    if (dateStr === "present") return language === "es" ? "Presente" : "Present";
    const [year, month] = dateStr.split("-");
    const months = language === "es" 
      ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{cv.basics.name}</Text>
          <Text style={styles.label}>{cv.basics.label}</Text>
          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <Svg width={12} height={12} viewBox="0 0 24 24">
                <Path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#666" />
              </Svg>
              <Text style={styles.contactText}>{cv.basics.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Svg width={12} height={12} viewBox="0 0 24 24">
                <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#666" />
              </Svg>
              <Text style={styles.contactText}>{cv.basics.phone}</Text>
            </View>
            <Text style={styles.contactText}>{cv.basics.location.city}, {cv.basics.location.countryCode}</Text>
          </View>
          <View style={styles.contactRow}>
            {cv.basics.profiles.map((profile, i) => (
              <Link key={i} src={profile.url} style={styles.contactItem}>
                {profile.network === "LinkedIn" ? (
                  <Svg width={14} height={14} viewBox="0 0 24 24">
                    <Path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#666" />
                  </Svg>
                ) : (
                  <Svg width={14} height={14} viewBox="0 0 24 24">
                    <Path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill="#666" />
                  </Svg>
                )}
                <Text style={styles.contactText}>{profile.username}</Text>
              </Link>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.about}</Text>
          <Text style={styles.summary}>{cv.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.experience}</Text>
          {cv.work.map((job, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{job.company}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(job.startDate)} – {formatDate(job.endDate)}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>{job.position}</Text>
              <Text style={styles.entryLocation}>{job.location}</Text>
              {job.highlights?.map((h, j) => (
                <Text key={j} style={styles.highlight}>• {h}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {cv.education.map((edu, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text style={styles.entryDate}>
                  {edu.startDate ? formatDate(edu.startDate) + " – " : ""}{formatDate(edu.endDate)}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>{edu.area}</Text>
              <Text style={styles.entryLocation}>{edu.location}</Text>
              {edu.highlights?.map((h, j) => (
                <Text key={j} style={styles.highlight}>• {h}</Text>
              ))}
            </View>
          ))}
        </View>

        {cv.projects && cv.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.projects}</Text>
            {cv.projects.map((project, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{project.name}</Text>
                  <Text style={styles.entryDate}>{formatDate(project.startDate)}</Text>
                </View>
                <Text style={styles.summary}>{project.description}</Text>
                {project.highlights?.map((h, j) => (
                  <Text key={j} style={styles.highlight}>• {h}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          {cv.skills.map((skill, i) => (
            <View key={i} style={styles.skillsContainer}>
              <Text style={styles.skillName}>{skill.name}:</Text>
              {skill.keywords.map((keyword, j) => (
                <Text key={j} style={styles.skillTag}>{keyword}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.languages}</Text>
          <View style={styles.skillsContainer}>
            {cv.languages.map((lang, i) => (
              <Text key={i} style={styles.skillTag}>{lang.language} — {lang.fluency}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
