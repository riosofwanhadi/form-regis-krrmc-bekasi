import { useForm } from "@mantine/form";

function UseAppForm() {
	const form = useForm({
		initialValues: {
			"Nama Lengkap": "",
			"Tempat Lahir": "",
			"Tanggal Lahir": null,
			"Alamat Lengkap": "",
			"No WhatsApp": "",
			"No KTP": "",
			"No SIM": "",
			Agama: "",
			"Jenis Kelamin": "",
			Status: "",
			"Golongan Darah": "",
			Pekerjaan: "",
			"Jenis Tipe Motor Kawasaki W175": "",
			"No Plat": "",
			"Warna Motor": "",
			"Tahun Pembuatan": "",
			"No STNK": "",
			"Apakah sudah pernah menjadi Anggota Club Sebelumnya": "",
			"Jika iya, apa nama Club Motor sebelum nya": "",
			"Alasan Join": "",
			"Darimana anda mengetahui KRRMC Bekasi": "",
		},
	});

	return { form };
}

export { UseAppForm };
