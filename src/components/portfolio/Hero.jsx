"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HeroSkeleton } from "../common/SectionSkeleton";

const contentShadow = "0 1px 3px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.4)";

export default function Hero({ profile, loading }) {
  if (loading) return <HeroSkeleton />;
  if (!profile) return null;

  const imageUrl =
    profile.imageUrl || profile.avatarUrl || profile.profileImageUrl;
  const name = profile.name || profile.fullName || "";
  const tagline = profile.tagline || profile.title || profile.headline || "";
  const slogan =
    profile.slogan || "I build scalable software and ship it with care.";
  const years = profile.yearsExperience ?? 3;

  return (
    <Box
      className="animate-fade-in"
      sx={{
        position: "relative",
        minHeight: "80%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
        gridTemplateRows: {
          xs: "auto auto auto auto auto",
          md: "1fr auto 1fr",
        },
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 2, md: 3 },
        px: { xs: 3, sm: 4, md: 5, lg: 6 },
        py: { xs: 5, sm: 6, md: 8 },
        overflow: "hidden",
        marginTop: "100px",
      }}
    >
      {/* Center image: position absolute, behind content, responsive */}
      {imageUrl && (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: -10,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            sx={{
              display: "block",
              maxWidth: "min(85vw, 820px)",
              width: "auto",
              height: "auto",
              maxHeight: "min(75vh, 880px)",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
      {/* Top left */}
      <Box
        className="hero-corner-float"
        sx={{
          position: "relative",
          zIndex: 10,
          gridColumn: { xs: 1, md: 1 },
          gridRow: { xs: 1, md: 1 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            wordBreak: "break-word",
            color: "text.primary",
            textShadow: contentShadow,
          }}
        >
          Hey there, I&apos;m {name.split(" ")[0] || name}
        </Typography>
      </Box>

      {/* Top right: slogan */}
      <Box
        className="hero-corner-float hero-corner-float-delay"
        sx={{
          position: "relative",
          zIndex: 10,
          gridColumn: { xs: 1, md: 3 },
          gridRow: { xs: 2, md: 1 },
          textAlign: { xs: "center", md: "right" },
          // maxWidth: 320,
          justifySelf: { md: "end" },
        }}
      >
        <Typography
          variant="h6"
          color="text.main"
          sx={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontStyle: "italic",
            lineHeight: 1.5,
            textShadow: contentShadow,
          }}
        >
          {slogan}
        </Typography>
      </Box>

      {/* Center: spacer when image is absolute, or fallback when no image */}
      {imageUrl ? (
        <Box
          sx={{
            gridColumn: { xs: 1, md: 2 },
            gridRow: { xs: 3, md: 2 },
            minHeight: { xs: 200, sm: 240, md: 280 },
            visibility: "hidden",
            pointerEvents: "none",
          }}
        />
      ) : (
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            gridColumn: { xs: 1, md: 2 },
            gridRow: { xs: 3, md: 2 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              bgcolor: "primary.dark",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              color="primary.contrastText"
            >
              {name.charAt(0)}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Bottom left */}
      <Box
        className="hero-corner-float hero-corner-float-delay-2"
        sx={{
          position: "relative",
          zIndex: 10,
          gridColumn: { xs: 1, md: 1 },
          gridRow: { xs: 4, md: 3 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          textAlign: { xs: "center", md: "left" },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography
          variant="h2"
          fontWeight={800}
          color="primary.main"
          sx={{
            fontSize: { xs: "3rem", sm: "3.5rem", md: "5rem" },
            lineHeight: 1,
            textShadow: contentShadow,
          }}
        >
          {years}+
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "text.primary", textShadow: contentShadow }}
          >
            years
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "text.primary", textShadow: contentShadow }}
          >
            experience
          </Typography>
        </Box>
      </Box>

      {/* Bottom right */}
      <Box
        className="hero-corner-float hero-corner-float-delay-3"
        sx={{
          position: "relative",
          zIndex: 10,
          gridColumn: { xs: 1, md: 3 },
          gridRow: { xs: 5, md: 3 },
          textAlign: { xs: "center", md: "right" },
          justifySelf: { md: "end" },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          sx={{ textShadow: contentShadow }}
        >
          {tagline}
        </Typography>
      </Box>
    </Box>
  );
}
