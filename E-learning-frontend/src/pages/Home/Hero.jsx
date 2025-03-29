import React from "react";
import { motion } from "framer-motion";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import Heropng from "../../assets/Hii.png";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

const features = [
  { id: 1, title: "1000+ Courses", icon: <FaBookReader />, delay: 0.2 },
  { id: 2, title: "Expert Instruction", icon: <GrUserExpert />, delay: 0.3 },
  { id: 3, title: "Lifetime Access", icon: <MdOutlineAccessTime />, delay: 0.4 },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Hero = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Grid container spacing={4} alignItems="center">
        {/* Left - Hero Image */}
        <Grid item xs={12} md={6}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <img src={Heropng} alt="Hero" className="w-full object-cover drop-shadow-lg rounded-2xl" />
          </motion.div>
        </Grid>

        {/* Right - Hero Text & Features */}
        <Grid item xs={12} md={6}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              The world's Leading{" "}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Online Learning Platform
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Learn from the best instructors and get access to thousands of courses worldwide.
            </p>
          </motion.div>

          {/* Features List */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: feature.delay }}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 4,
                      bgcolor: "white",
                      boxShadow: 4,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: 8,
                      },
                    }}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    <Box sx={{ fontSize: 40, color: "#ef4444", mb: 2 }}>{feature.icon}</Box>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} color="text.primary" className="dark:text-white">
                        {feature.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
