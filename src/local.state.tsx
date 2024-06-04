import { useForm } from "@mantine/form";
import { zodResolver } from "@mantine/form";
import { z } from "zod";

function UseAppForm() {
	const schema = z.object({
		"Nama Lengkap": z
			.string()
			.min(1, { message: "Mohon Isi Nama Lengkap Dengan Benar !" }),
	});
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
