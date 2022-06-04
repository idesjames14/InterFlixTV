/*
js-code by - https://codepen.io/JavaScriptJunkie/pen/qBWrRyg?editors=1000
design by Filip Legierski.
design: https://dribbble.com/shots/9338617-Simple-Music-Player
*/

var app = new Vue({
	el: "#app",
	data: {
		audio: "",
		imgLoaded: false,
		currentlyPlaying: false,
		currentlyStopped: false,
		currentTime: 0,
		checkingCurrentPositionInTrack: "",
		trackDuration: 0,
		currentProgressBar: 0,
		isPlaylistActive: false,
		currentSong: 0,
		debug: false,
		musicPlaylist: [
        {
          title: "첸, 백현, 시우민 (EXO)",
          artist: "너를 위해 For You",
          image: "scarlet-heart-ryeo/poster.jpg",
          url: "scarlet-heart-ryeo/너를 위해 For You.mp3",
        },
				{
          title: "로꼬, 펀치 Loco, Punch",
          artist: "Say Yes",
          image: "scarlet-heart-ryeo/poster.jpg",
          url: "scarlet-heart-ryeo/Say Yes.mp3",
        },
        {
          title: "사랑해 기억해 I Love You, I Remember You",
          artist: "아이오아이 I.O.I",
          image: "scarlet-heart-ryeo/poster.jpg",
          url: "scarlet-heart-ryeo/사랑해 기억해 I Love You, I Remember You.mp3",
        },

        {
          title: "Butterflies",
          artist: "Sia",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
        },
        {
          title: "The Final Victory",
          artist: "Haggard",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
        },
        {
          title: "The Comeback Kid",
          artist: "Lindi Ortega",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
        },
        {
          title: "Overdose",
          artist: "Grandson",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
        },
				{
          title: "Mekanın Sahibi",
          artist: "Norm Ender",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
        },
        {
          title: "Rag'n'Bone Man",
          artist: "Human",
          image: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          url: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
        }
		],
		audioFile: ""
	},
	mounted: function() {
		this.changeSong();
		this.audio.loop = false;
	},
	filters: {
		fancyTimeFormat: function(s) {
			return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
		}
	},
	methods: {
		togglePlaylist: function() {
			this.isPlaylistActive = !this.isPlaylistActive;
		},
		nextSong: function() {
			if (this.currentSong < this.musicPlaylist.length - 1)
				this.changeSong(this.currentSong + 1);
		},
		prevSong: function() {
			if (this.currentSong > 0) this.changeSong(this.currentSong - 1);
		},
		changeSong: function(index) {
			var wasPlaying = this.currentlyPlaying;
			this.imageLoaded = false;
			if (index !== undefined) {
				this.stopAudio();
				this.currentSong = index;
			}
			this.audioFile = this.musicPlaylist[this.currentSong].url;
			this.audio = new Audio(this.audioFile);
			var localThis = this;
			this.audio.addEventListener("loadedmetadata", function() {
				localThis.trackDuration = Math.round(this.duration);
			});
			this.audio.addEventListener("ended", this.handleEnded);
			if (wasPlaying) {
				this.playAudio();
			}
		},
		isCurrentSong: function(index) {
			if (this.currentSong == index) {
				return true;
			}
			return false;
		},
		getCurrentSong: function(currentSong) {
			return this.musicPlaylist[currentSong].url;
		},
		playAudio: function() {
			if (
				this.currentlyStopped == true &&
				this.currentSong + 1 == this.musicPlaylist.length
			) {
				this.currentSong = 0;
				this.changeSong();
			}
			if (!this.currentlyPlaying) {
				this.getCurrentTimeEverySecond(true);
				this.currentlyPlaying = true;
				this.audio.play();
			} else {
				this.stopAudio();
			}
			this.currentlyStopped = false;
		},
		stopAudio: function() {
			this.audio.pause();
			this.currentlyPlaying = false;
			this.pausedMusic();
		},
		handleEnded: function() {
			if (this.currentSong + 1 == this.musicPlaylist.length) {
				this.stopAudio();
				this.currentlyPlaying = false;
				this.currentlyStopped = true;
			} else {
				this.currentlyPlaying = false;
				this.currentSong++;
				this.changeSong();
				this.playAudio();
			}
		},
		onImageLoaded: function() {
			this.imgLoaded = true;
		},
		getCurrentTimeEverySecond: function(startStop) {
			var localThis = this;
			this.checkingCurrentPositionInTrack = setTimeout(
				function() {
					localThis.currentTime = localThis.audio.currentTime;
					localThis.currentProgressBar =
						localThis.audio.currentTime / localThis.trackDuration * 100;
					localThis.getCurrentTimeEverySecond(true);
				}.bind(this),
				1000
			);
		},
		pausedMusic: function() {
			clearTimeout(this.checkingCurrentPositionInTrack);
		},
		toggleDebug: function(){
			this.debug=!this.debug;
			document.body.classList.toggle('debug');
		}
	},
	watch: {
		currentTime: function() {
			this.currentTime = Math.round(this.currentTime);
		}
	},
	beforeDestroy: function() {
		this.audio.removeEventListener("ended", this.handleEnded);
		this.audio.removeEventListener("loadedmetadata", this.handleEnded);

		clearTimeout(this.checkingCurrentPositionInTrack);
	}
});