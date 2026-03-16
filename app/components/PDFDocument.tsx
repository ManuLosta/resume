import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
  contact: {
    fontSize: 9,
    color: "#666",
    marginBottom: 3,
    textAlign: "center",
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 6,
  },
  link: {
    fontSize: 9,
    color: "rgb(0, 79, 144)",
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
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: "#e5e5e5",
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
          <Text style={styles.contact}>{cv.basics.email}</Text>
          <Text style={styles.contact}>{cv.basics.phone}</Text>
          <Text style={styles.contact}>{cv.basics.location.city}, {cv.basics.location.countryCode}</Text>
          <View style={styles.links}>
            {cv.basics.profiles.map((profile, i) => (
              <Text key={i} style={styles.link}>{profile.network}: {profile.username}</Text>
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
