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
    marginBottom: 20,
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
  },
  contact: {
    fontSize: 9,
    color: "#666",
    marginBottom: 4,
  },
  links: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  link: {
    fontSize: 9,
    color: "rgb(0, 79, 144)",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgb(0, 79, 144)",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(0, 79, 144)",
    paddingBottom: 2,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 10,
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
    color: "#666",
    marginBottom: 4,
  },
  highlight: {
    fontSize: 9,
    color: "#444",
    marginLeft: 8,
    marginBottom: 1,
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillName: {
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 2,
  },
  skillKeywords: {
    fontSize: 9,
    color: "#444",
    flexWrap: "wrap",
  },
  summary: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.4,
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
          <Text style={styles.contact}>{cv.basics.email} | {cv.basics.phone}</Text>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          {cv.skills.map((skill, i) => (
            <View key={i} style={styles.skillsContainer}>
              <Text style={styles.skillName}>{skill.name}:</Text>
              <Text style={styles.skillKeywords}>{skill.keywords.join(", ")}</Text>
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
                  <Text style={styles.entryDate}>{project.startDate}</Text>
                </View>
                <Text style={styles.summary}>{project.description}</Text>
                {project.highlights?.map((h, j) => (
                  <Text key={j} style={styles.highlight}>• {h}</Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
