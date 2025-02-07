import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const ListComponent = ({ data, onTopicSelect, onSubtopicSelect }) => {

  const [openStates, setOpenStates] = React.useState(() =>
    data.map(() => false) // Initialize an open state for each topic
  );

  const handleToggle = (index) => {
    setOpenStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleTopicClick = (index, topic) => {
    if (onTopicSelect) {
      onTopicSelect(topic); // Notify parent about the topic selection
    }
    handleToggle(index); // Toggle the current topic
  };

  return (
    <Box>
      <List
        size="sm"
        sx={{
          '--List-insetStart': '32px',
          '--ListItem-paddingY': '0px',
          '--ListItem-paddingRight': '16px',
          '--ListItem-paddingLeft': '18px',
          '--ListItem-startActionWidth': '0px',
          '--ListItem-startActionTranslateX': '-50%',
        }}
      >
        {data.map((topic, index) =>  (
          <ListItem
            key={index}
            nested
            sx={{ my: 1 }}
            startAction={
              <IconButton
                variant="plain"
                size="sm"
                onClick={() => handleTopicClick(index, topic)}
                className="text-gray-800 dark:text-white text-base lg:text-lg"
              >
                <KeyboardArrowDown
                  sx={{
                    transition: 'transform 0.3s ease',
                    transform: openStates[index] ? 'initial' : 'rotate(-90deg)',
                  }}
                />
              </IconButton>
            }
          >
            <Typography
              level="inherit"
              sx={{
                fontWeight: openStates[index] ? 'bold' : 'normal',
              }}
              className="flex flex-wrap cursor-pointer"
              onClick={() => handleTopicClick(index, topic)}
            >
              <p className="text-gray-800 dark:text-white text-base lg:text-lg">
                {topic.title}
              </p>
            </Typography>
            {openStates[index] && (
              <List
                sx={{ '--ListItem-paddingY': '8px' }}
                className="text-gray-700 dark:text-gray-400"
              >
                {topic.lessons.map((subtopic, subIndex) => (
                  <ListItem key={subIndex}>
                    <ListItemButton
                      onClick={() =>
                        onSubtopicSelect && onSubtopicSelect(subtopic)
                      }
                      sx={{
                        backgroundColor: 'transparent', // No background change on hover
                        '&:hover': {
                          backgroundColor: 'transparent', // Prevent hover effect
                        },
                      }}
                    >
                      <p className="text-gray-800 dark:text-white text-sm lg:text-base">
                        {subtopic.stitle}
                      </p>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListComponent;
