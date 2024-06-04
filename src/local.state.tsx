import { useForm } from "@mantine/form";
import { IFormRequest } from "./type";

function UseAppForm() {
	const form = useForm<IFormRequest>({
		initialValues: {
			"Nama Lengkap": null,
			"Tempat Lahir": null,
			"Tanggal Lahir": null,
			"Alamat Lengkap": null,
			"No WhatsApp": null,
			"No KTP": null,
			"No SIM": null,
			Agama: null,
			"Jenis Kelamin": null,
			Status: null,
			"Golongan Darah": null,
			Pekerjaan: null,
			"Jenis Tipe Motor Kawasaki W175": null,
			"No Plat": null,
			"Warna Motor": null,
			"Tahun Pembuatan": null,
			"No STNK": null,
			"Apakah sudah pernah menjadi Anggota Club Sebelumnya": null,
			"Jika iya, apa nama Club Motor sebelum nya": null,
			"Alasan Join": null,
			"Darimana anda mengetahui KRRMC Bekasi": null,
			Foto: null,
		},
	});

	return { form };
}

export { UseAppForm };
