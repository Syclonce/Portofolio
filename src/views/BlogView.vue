<template>
  <div class="container mx-auto p-3 md:p-8">
    <div class="flex flex-col-reverse md:flex-row relative">
      <div class="w-full md:w-2/3">
        <div class="flex flex-col gap-4 md:px-20 fade-zoom-up">
          <article v-for="article in articles" :key="article.id">
            <router-link :to="`/read/${article.slug}/${article.id}`" class="flex w-full bg-[#1e1e1f] border-[#383838] rounded-xl text-left text-white p-5 md:py-7 md:px-8 cursor-pointer hover:bg-[#282828] items-center">
              <div class="w-full pr-4">
                <div class="text-xs mb-1 text-slate-400 flex items-center italic">
                  <div class="h-[1px] w-20 bg-amber-200 md:w-5 aos-init aos-animate mr-2"></div> {{ article.date }}
                </div>
                <h1 class="text-sm md:text-md text-amber-200 font-bold mb-2 paraf">{{ article.title }}</h1>
              </div>
              <div>
                <div class="w-20 h-20 md:w-28 flex items-center md:h-28">
                  <img :src="article.image" class="rounded-lg md:rounded-xl" alt="">
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>
      <div class="w-full md:w-1/3 h-fit p-8 md:sticky md:top-24">
        <!-- Sidebar -->
        <div class="flex flex-col text-left">
          <div class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">Let's share experiences, stories, and knowledge together.</div>
          <div class="h-[1px] mt-7 mb-7 w-20 bg-amber-200 aos-init aos-animate mr-2"></div>
          <div class="hidden md:block">
            <div class="text-white text-md font-semibold">Topics</div>
            <div class="mt-3 flex flex-wrap gap-1">
              <span v-for="topic in topics" :key="topic" class="py-2 px-3 rounded-2xl bg-[#1e1e1f] hover:bg-white/20 text-white text-xs cursor-pointer" @click="getArticlesByTopic(topic)">{{ topic }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ArticleList />
</template>

<script>
import ArticleList from '@/components/ArticleList.vue';
import axios from "axios";
export default {
  data() {
    return {
      articles: [],
      topics: []
    }
  },
  components: {
    ArticleList
  },
  mounted() {
    this.getArticles();
    this.getTopics();
  },
  methods: {
    async getArticles() {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        this.articles = response.data;
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    async getTopics() {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        const topics = response.data.reduce((acc, post) => {
          if (post.topics) {
            acc.push(...post.topics.split(',').map(topic => topic.trim()));
          }
          return acc;
        }, []);
        // Tambahkan opsi "All Topics"
        this.topics = ['All Topics', ...Array.from(new Set(topics))];
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    },
    async getArticlesByTopic(topic) {
      try {
        let response;
        // Jika dipilih "All Topics", tampilkan semua artikel
        if (topic === 'All Topics') {
          response = await axios.get('http://localhost:3000/api/posts');
        } else {
          response = await axios.get(`http://localhost:3000/api/posts/topics/${topic}`);
        }
        this.articles = response.data;
      } catch (error) {
        console.error(`Error fetching articles for topic ${topic}:`, error);
      }
    }
  }
}
</script>

<style scoped>
.paraf {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media (min-width: 768px) { 
  .paraf {
    display: -webkit-box;
  }
}
@keyframes fadeZoomUp {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.fade-zoom-up {
  animation: fadeZoomUp 1s ease-in-out;
}
</style>
