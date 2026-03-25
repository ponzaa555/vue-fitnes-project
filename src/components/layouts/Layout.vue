<template>
    <header>
        <h1 class="text-gradient">Header</h1>
    </header>
    <main>
        <slot/>
    </main>
    <footer>
        <small>Created by</small>
        <a href="https://github.com/ponzaa555" target="_blank">
            <img src="https://avatars.githubusercontent.com/u/100279911?v=4" alt="pfp">
            <p>Napon</p>
        </a>
    </footer>
</template>

<script setup>
</script>

<style scoped>
 header,footer,main{
    padding: 1rem;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
 }
 main{
    flex:1;
 }
 footer{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    padding: 3rem 0;
    padding-bottom: 4rem;
 }

 footer a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem;
    padding-right: 0.5rem;
 }
</style>