interface DataType {
	id: number;
	title: string;
	link: string;
	has_dropdown?: boolean;
	sub_menus?: {
		link: string;
		title: string;
	}[];
}
const menu_data: DataType[] = [
	{
		id: 1,
		title: "Beranda",
		link: "/",
		has_dropdown: false,
	},
	{
		id: 2,
		title: "Tentang",
		link: "/about",
		has_dropdown: false,
	},
	{
		id: 3,
		title: "Layanan",
		link: "/service",
		has_dropdown: false,
	},
	{
		id: 4,
		title: "Proyek",
		link: "#",
		has_dropdown: true,
		sub_menus: [
			{ link: "/projects", title: "Daftar Proyek" },
		],
	},
	{
		id: 6,
		title: "Kontak",
		link: "/contact",
		has_dropdown: false,
	},
];
export default menu_data;
