interface IFormRequest {
	Timestamp?: Date;
	"Nama Lengkap": string | null;
	"Tempat Lahir": string | null;
	"Tanggal Lahir": Date | null;
	"Alamat Lengkap": string | null;
	"No WhatsApp": string | null;
	"No KTP": string | null;
	"No SIM": string | null;
	Agama: string | null;
	"Jenis Kelamin": string | null;
	Status: string | null;
	"Golongan Darah": string | null;
	Pekerjaan: string | null;
	"Jenis Tipe Motor Kawasaki W175": string | null;
	"No Plat": string | null;
	"Warna Motor": string | null;
	"Tahun Pembuatan": number | null;
	"No STNK": string | null;
	"Apakah sudah pernah menjadi Anggota Club Sebelumnya": string | null;
	"Jika iya, apa nama Club Motor sebelum nya": string | null;
	"Alasan Join": string | null;
	"Darimana anda mengetahui KRRMC Bekasi": string | null;
	Foto: string | null;
}

export type { IFormRequest };
