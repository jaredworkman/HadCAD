<template>
	<div class="primary--text">Manager</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		async printReport(){
			var pdf = new jsPDF('p', 'pt', 'letter');
			pdf.canvas.height = 72 * 11;
			pdf.canvas.width = 72 * 8.5;
			pdf.fromHTML(document.getElementById('pdfDiv'));
			window.print();
			pdf.save('testing');
  		},
	}
}
</script>

