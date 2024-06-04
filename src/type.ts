interface IFormRequest {
	Timestamp?: Date;
	"Nama Lengkap": string;
	"Tempat Lahir": string;
	"Tanggal Lahir": Date;
	"Alamat Lengkap": string;
	"No WhatsApp": string;
	"No KTP": string;
	"No SIM": string;
	Agama: string;
	"Jenis Kelamin": string;
	Status: string;
	"Golongan Darah": string;
	Pekerjaan: string;
	"Jenis Tipe Motor Kawasaki W175": string;
	"No Plat": string;
	"Warna Motor": string;
	"Tahun Pembuatan": number;
	"No STNK": string;
	"Apakah sudah pernah menjadi Anggota Club Sebelumnya": string;
	"Jika iya, apa nama Club Motor sebelum nya": string;
	"Alasan Join": string;
	"Darimana anda mengetahui KRRMC Bekasi": string;
}

export type { IFormRequest };
