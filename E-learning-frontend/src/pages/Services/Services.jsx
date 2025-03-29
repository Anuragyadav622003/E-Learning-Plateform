import React from "react";
import { motion } from "framer-motion";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { RiComputerLine } from "react-icons/ri";
import { TbWorldWww } from "react-icons/tb";
import { CiMobile3 } from "react-icons/ci";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";

const servicesData = [
  { id: 1, title: "Web Development", icon: <TbWorldWww />, delay: 0.2 },
  { id: 2, title: "App Development", icon: <CiMobile3 />, delay: 0.3 },
  { id: 3, title: "Software Development", icon: <RiComputerLine />, delay: 0.4 },
  { id: 4, title: "Satisfied Clients", icon: <IoMdHappy />, delay: 0.5 },
  { id: 5, title: "24/7 Support", icon: <BiSupport />, delay: 0.6 },
  { id: 6, title: "SEO Optimization", icon: <IoPulseOutline />, delay: 0.7 },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Services = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Our <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Services</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore our range of services designed to empower businesses and individuals.
        </p>
      </motion.div>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
        {servicesData.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: service.delay }}>
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
                <Box sx={{ fontSize: 50, color: "#ef4444", mb: 2 }}>{service.icon}</Box>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} color="text.primary" className="dark:text-white">
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
