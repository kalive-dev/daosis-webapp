import MainIcon from "../assets/images/main-icon.svg"; // SVG as an image

const TaskList = ({ type }) => {
    const tasks = [
        { title: 'Main Title 1', amount: '+250$', icon: MainIcon },
        { title: 'Main Title 2', amount: '-50$', icon: MainIcon },
    ];

    return (
        <List>
            {tasks.map((task, index) => (
                <ListItem key={index} sx={{ backgroundColor: 'gray', mb: 1 }}>
                    <ListItemAvatar>
                        <Avatar src={task.icon} /> {/* Set the src of the Avatar */}
                    </ListItemAvatar>
                    <ListItemText primary={task.title} secondary={task.amount} />
                    <Button variant="contained">BTN</Button>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
