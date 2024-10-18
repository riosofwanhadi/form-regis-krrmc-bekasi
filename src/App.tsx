import {
	Button,
	Center,
	Checkbox,
	Divider,
	Group,
	Image,
	List,
	NumberInput,
	ScrollArea,
	Select,
	Stack,
	Text,
	TextInput,
	Textarea,
	UnstyledButton,
	rem,
	useMantineTheme,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { banner, logo } from "./assets";
import { DatePickerInput } from "@mantine/dates";
import { UseAppForm } from "./local.state";
import { hakAnggota, kewajibanAnggota, nilaiDeklarasi } from "./arrays";
import { useState } from "react";
import dayjs from "dayjs";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { app } from "./config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function App() {
	const theme = useMantineTheme();
	const { form } = UseAppForm();
	const [checkedAturan, setCheckedAturan] = useState<boolean>(false);
	const [checkedKesanggupan, setCheckedKesanggupan] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isUploaded, setIsUploaded] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	async function onUpload(files: FileWithPath[]) {
		const storage = getStorage(
			app,
			"gs://formregistrationkrrmcbekasi.appspot.com"
		);
		const storageRef = ref(
			storage,
			`FotoAnggota/${form.values["Nama Lengkap"]}.${files[0].name.substring(
				files[0].name.length - 3
			)}`
		);
		const metaData = {
			contentType: "image/jpeg",
		};
		const blob = new Blob(files);
		await uploadBytes(storageRef, blob, metaData);
		const url = await getDownloadURL(storageRef);
		form.setFieldValue("Foto", url);
		setIsUploaded(true);
	}

	function onSubmit() {
		const formData = new FormData();
		for (const key in form.values) {
			if (
				form.values[key as keyof typeof form.values] !== null &&
				form.values[key as keyof typeof form.values] !== ""
			) {
				formData.append(
					"data[Timestamp]",
					dayjs().format("DD-MM-YYYY HH:mm:ss")
				);
				if (key === "Tanggal Lahir") {
					formData.append(
						`data[${key}]`,
						dayjs(form.values[key as keyof typeof form.values] as Date).format(
							"DD-MM-YYYY"
						)
					);
				} else {
					formData.append(
						`data[${key}]`,
						form.values[key as keyof typeof form.values] as any
					);
				}
			} else {
				formData.append(`data[${key}]`, "-");
			}
		}
		setLoading(true);
		fetch("https://sheetdb.io/api/v1/w6i20d1seu2ba", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				form.reset();
				setCheckedAturan(false);
				setCheckedKesanggupan(false);
				setLoading(false);
				setIsSuccess(true);
			})
			.catch((error) => {
				console.log(error.message);
				setLoading(false);
			});
	}

	return isSuccess ? (
		<div
			style={{ width: "100vw", height: "100vh", backgroundColor: theme.black }}
		>
			<Stack
				gap={0}
				align="center"
				justify="space-between"
				w="100%"
				h="100%"
				py="xl"
			>
				<Text
					c="white"
					p={5}
					w="90%"
					fz={50}
					ta="center"
					style={{
						fontFamily: "RyeRegular",
						backgroundColor: "#d2212b",
						WebkitTextStrokeColor: "#000000",
						WebkitTextStrokeWidth: "1px",
						border: "solid",
						borderColor: theme.white,
						borderWidth: "3px",
					}}
				>
					RESPECT
				</Text>
				<Image src={logo} />
				<Text
					style={{
						fontFamily: "RyeRegular",
						backgroundColor: "#d2212b",
						WebkitTextStrokeColor: "#000000",
						WebkitTextStrokeWidth: "1px",
						border: "solid",
						borderColor: theme.white,
						borderWidth: "3px",
					}}
					c="white"
					w="90%"
					fz={40}
					p={15}
					ta="center"
				>
					W E L C O M E
				</Text>
			</Stack>
		</div>
	) : (
		<ScrollArea h="100%">
			<Stack gap={0}>
				<Group gap={15} align="center" justify="center" p={15}>
					<Image src={logo} w={80} />
					<Stack gap={0} align="center" justify="center" w={250}>
						<Text
							fz={13}
							fw={700}
							ta="center"
							style={{ fontFamily: "RyeRegular" }}
						>
							KAWASAKI RETRO RIDERS W175
						</Text>
						<Text
							fz={13}
							fw={700}
							mt={-5}
							ta="center"
							style={{ fontFamily: "RyeRegular" }}
						>
							MOTORCYCLE CLUB BEKASI
						</Text>
						<Text fz={9} ta="center">
							Warkop Putra Barokah | Jl. Pulo Ribung No.22, RT.004/RW.021,
							Pekayon Jaya, Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148 | +62
							878 0829 2919
						</Text>
					</Stack>
				</Group>
				<Divider size="sm" color={theme.black} />
				<Center pt={15}>
					<Text fz={12} fw={700} style={{ fontFamily: "RyeRegular" }}>
						FORMULIR PENDAFTARAN ANGGOTA
					</Text>
				</Center>
				<Stack gap={0} px={15} py={10}>
					<Text fz={11} fw={700}>
						DATA DIRI
					</Text>
					<TextInput
						placeholder="Nama Lengkap"
						size="xs"
						pb={5}
						required
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Nama Lengkap")}
					/>
					<Group pb={5} gap={5}>
						<TextInput
							placeholder="Tempat"
							size="xs"
							w="49%"
							required
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("Tempat Lahir")}
						/>
						<DatePickerInput
							placeholder="Tanggal Lahir"
							size="xs"
							w="49%"
							required
							valueFormat="DD-MM-YYYY"
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("Tanggal Lahir")}
						/>
					</Group>
					<Textarea
						placeholder="Alamat Lengkap"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Alamat Lengkap")}
					/>
					<TextInput
						placeholder="No. KTP"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("No KTP")}
					/>
					<TextInput
						placeholder="No. SIM C"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("No SIM")}
					/>
					<TextInput
						placeholder="No. WhatsApp"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("No WhatsApp")}
					/>
					<Select
						placeholder="Agama"
						size="xs"
						data={[
							"Islam",
							"Kristen",
							"Katolik",
							"Hindu",
							"Buddha",
							"Khonghucu",
						]}
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Agama")}
					/>
					<Select
						placeholder="Jenis Kelamin"
						size="xs"
						data={["Laki-laki", "Perempuan"]}
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Jenis Kelamin")}
					/>
					<Select
						placeholder="Status"
						size="xs"
						data={["Single", "Menikah"]}
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Status")}
					/>
					<Select
						placeholder="Golongan Darah"
						size="xs"
						data={["A", "B", "AB", "O"]}
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Golongan Darah")}
					/>
					<TextInput
						placeholder="Pekerjaan"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Pekerjaan")}
					/>
				</Stack>
				<Stack gap={0} px={15} py={10}>
					<Text fz={11} fw={700}>
						INFORMASI KENDARAAN
					</Text>
					<Select
						size="xs"
						placeholder="Tipe Motor W175"
						data={["Standar", "Special Edition", "Cafe", "TR"]}
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Jenis Tipe Motor Kawasaki W175")}
					/>
					<Group gap={5}>
						<TextInput
							placeholder="Warna Motor"
							size="xs"
							pb={5}
							w="49%"
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("Warna Motor")}
						/>
						<TextInput
							placeholder="No. Plat Motor"
							size="xs"
							pb={5}
							w="49%"
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("No Plat")}
						/>
					</Group>
					<Group gap={5}>
						<NumberInput
							placeholder="Tahun Pembuatan"
							hideControls
							size="xs"
							pb={5}
							w="49%"
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("Tahun Pembuatan")}
						/>
						<TextInput
							placeholder="No. STNK"
							size="xs"
							pb={5}
							w="49%"
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps("No STNK")}
						/>
					</Group>
				</Stack>
				<Stack gap={0} px={15} py={10}>
					<Text fz={11} fw={700}>
						KEANGGOTAAN
					</Text>
					<Select
						placeholder="Pernah Menjadi Anggota Club / Komunitas Sebelumnya"
						data={["Ya", "Tidak"]}
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps(
							"Apakah sudah pernah menjadi Anggota Club Sebelumnya"
						)}
					/>
					{form.values[
						"Apakah sudah pernah menjadi Anggota Club Sebelumnya"
					] === "Ya" ? (
						<TextInput
							placeholder="Nama Club / Komunitas Sebelumnya"
							size="xs"
							pb={5}
							styles={{
								input: {
									fontSize: 10,
								},
							}}
							{...form.getInputProps(
								"Jika Ya, apa nama Club Motor sebelum nya"
							)}
						/>
					) : null}
					<Textarea
						placeholder="Alasan Bergabung Dengan KRR W175 MC Bekasi"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Alasan Join")}
					/>
					<TextInput
						placeholder="Bagaimana Anda Mengetahui KRR W175 Bekasi"
						size="xs"
						pb={5}
						styles={{
							input: {
								fontSize: 10,
							},
						}}
						{...form.getInputProps("Darimana anda mengetahui KRRMC Bekasi")}
					/>
				</Stack>
				<Text fz={11} fw={700} px={15}>
					LAMPIRAN
				</Text>
				<Group px={15} gap={15}>
					{isUploaded ? (
						<Stack justify="center" align="center" w="100%" gap={10}>
							<Group
								w="100%"
								align="center"
								justify="center"
								style={{
									border: "solid",
									borderWidth: "1px",
									borderStyle: "dotted",
									borderRadius: theme.radius.md,
									borderColor: theme.colors.gray[6],
								}}
							>
								<Image src={form.values.Foto} h={140} />
							</Group>
							<UnstyledButton
								onClick={() => {
									setIsUploaded(false);
									form.setFieldValue("Foto", "");
								}}
							>
								<Text fz={10} ta="center" td="underline" c="blue">
									Upload Ulang
								</Text>
							</UnstyledButton>
						</Stack>
					) : (
						<Dropzone
							w="100%"
							h={150}
							accept={["image/jpeg"]}
							multiple={false}
							px={15}
							onDrop={(files: FileWithPath[]) => onUpload(files)}
						>
							<Group gap={15} justify="center">
								<Dropzone.Idle>
									<IconPhoto
										style={{
											width: rem(52),
											height: rem(52),
											color: "var(--mantine-color-dimmed)",
										}}
										stroke={1.5}
									/>
								</Dropzone.Idle>
								<Stack gap={0}>
									<Text fz={10} fw={700} w={300} ta="center">
										Upload Foto Anda Bersama Motor Anda (Tidak Memakai Helm,
										Masker/Buff dan Utamakan Siang Hari)
									</Text>
									<Text fz={10} w={300} ta="center" c="dimmed">
										Format Yang Diterima Hanya .jpg
									</Text>
								</Stack>
							</Group>
						</Dropzone>
					)}
				</Group>
				<Text fz={10} px={15} pt={15} ta="justify">
					Formulir ini saya ajukan untuk bergabung dengan Kawasaki Retro Riders
					W175 Motorcycle Club (KRRMC) Bekasi, serta tidak ada paksaan dari
					pihak lain manapun. Dengan menandatangi formulir ini, saya menyatakan
					bahwa semua informasi yang saya berikat adalah benar dan akurat. Maka
					dengan ini saya akan memenuhi semua syarat-syarat dibawah ini :
				</Text>
				<List withPadding={false} px={30} w="95%" size="xs">
					<List.Item>
						<Text fz={10} ta="justify">
							Memiliki unit sepeda motor <strong>Kawasaki W175</strong> berjenis
							apapun,
						</Text>
					</List.Item>
					<List.Item>
						<Text fz={10} ta="justify">
							Bersedia mengikuti iuran secara <strong>sukarelawan</strong>
							setiap bulannya dan mematuhi semua peraturan yang sudah dibuat
							oleh KRRMC Bekasi,
						</Text>
					</List.Item>
					<List.Item>
						<Text fz={10} ta="justify">
							<strong>Tidak tergabung</strong> dengan club / komunitas motor
							Kawasaki W175 lainnya,
						</Text>
					</List.Item>
					<List.Item>
						<Text fz={10} ta="justify">
							<strong>Wajib mengikuti program orientasi keanggotaan</strong>{" "}
							sampai layak diakui menjadi anggota KRR W175 MC Bekasi,
						</Text>
					</List.Item>
				</List>

				<Checkbox
					label="Saya setuju dengan segala aturan yang ada di KRR W175 MC Bekasi"
					size="xs"
					pt={15}
					px={15}
					styles={{ label: { fontSize: 10 } }}
					color={theme.black}
					checked={checkedAturan}
					onChange={(event) => setCheckedAturan(event.currentTarget.checked)}
				/>
				<Image src={banner} w="100%" py={10} />
				<Stack px={15} gap={0}>
					<Text
						fz={12}
						ta="center"
						fw={700}
						style={{ fontFamily: "RyeRegular" }}
					>
						SURAT KESANGGUPAN ANGGOTA
					</Text>
					<Text
						fz={12}
						ta="center"
						fw={700}
						style={{ fontFamily: "RyeRegular" }}
					>
						KAWASAKI RETRO RIDERS W175
					</Text>
					<Text
						fz={12}
						ta="center"
						fw={700}
						style={{ fontFamily: "RyeRegular" }}
					>
						MOTORCYCLE CLUB BEKASI
					</Text>
				</Stack>
				<Text fz={11} fw={700} px={15} py={10}>
					NILAI-NILAI DEKLARASI
				</Text>
				<List withPadding={false} px={30} w="95%" size="xs">
					{nilaiDeklarasi.map((val: string) => (
						<List.Item>
							<Text fz={10} ta="justify">
								{val}
							</Text>
						</List.Item>
					))}
				</List>
				<Text fz={11} fw={700} px={15} py={10}>
					HAK ANGGOTA KRR W175 MC BEKASI
				</Text>
				<List withPadding={false} px={30} w="95%" size="xs">
					{hakAnggota.map((val: string) => (
						<List.Item>
							<Text fz={10} ta="justify">
								{val}
							</Text>
						</List.Item>
					))}
				</List>
				<Text fz={11} fw={700} px={15} py={10}>
					KEWAJIBAN ANGGOTA KRR W175 MC BEKASI
				</Text>
				<List withPadding={false} px={30} w="95%" size="xs">
					{kewajibanAnggota.map((val: string) => (
						<List.Item>
							<Text fz={10} ta="justify">
								{val}
							</Text>
						</List.Item>
					))}
				</List>
				<Checkbox
					label="Saya setuju dengan surat kesanggupan KRR W175 MC Bekasi"
					size="xs"
					pt={15}
					px={15}
					styles={{ label: { fontSize: 10 } }}
					color={theme.black}
					checked={checkedKesanggupan}
					onChange={(event) =>
						setCheckedKesanggupan(event.currentTarget.checked)
					}
				/>
				<Group p={15}>
					<Button
						fullWidth
						loading={loading}
						variant="gradient"
						gradient={{ from: "#000000", to: "red", deg: 90 }}
						c={theme.white}
						onClick={() => onSubmit()}
						disabled={checkedAturan && checkedKesanggupan ? false : true}
						style={{ fontFamily: "RyeRegular" }}
					>
						D A F T A R
					</Button>
				</Group>
			</Stack>
		</ScrollArea>
	);
}

export default App;
