// const adminPaths2 = [
// 	{
// 		name: "Dashboard",
// 		path: "dashboard",
// 		element: "AdminDashboard",
// 	},
// 	{
// 		name: "User Management",
// 		children: [
// 			{
// 				name: "Create Admin",
// 				path: "create-admin",
// 				element: "CreateAdmin",
// 			},
// 			{
// 				name: "Create Faculty",
// 				path: "create-faculty",
// 				element: "CreateFaculty",
// 			},
// 			{
// 				name: "Create Student",
// 				path: "create-student",
// 				element: "CreateStudent",
// 			},
// 		],
// 	},
// 	{
// 		name: "Course Management",
// 		children: [
// 			{
// 				name: "Offered Course",
// 				path: "offered-course",
// 				element: "CreateAdmin",
// 			},
// 		],
// 	},
// ];

// // const newArray = adminPaths2.reduce((acc, item) => {
// // 	if (item.path && item.element) {
// // 		acc.push({
// // 			path: item.path,
// // 			element: item.element,
// // 		});
// // 	}
// // 	if (item.children) {
// // 		item.children.forEach((child) => {
// // 			acc.push({
// // 				path: child.path,
// // 				element: child.element,
// // 			});
// // 		});
// // 	}
// // 	return acc;
// // }, []);

// const newArray = adminPaths2.reduce((acc, item) => {
// 	if (item.path && item.name) {
// 		acc.push({
// 			key: item.name,
// 			label: "NavLink",
// 		});
// 	}
// 	if (item.children) {
// 		acc.push({
// 			key: item.name,
// 			label: "NavLink",
// 			children: item.children.map((child) => ({
// 				key: child.name,
// 				label: "NavLink",
// 			})),
// 		});
// 	}
// 	return acc;
// }, []);

// console.log(JSON.stringify(newArray));
