"use client"
import "./upload.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Upload () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [featuredArtists, setFeaturedArtists] = useState("")
    const [album, setAlbum] = useState("")
    const [type, setType] = useState("")
    const [highlights, setHighlights] = useState("")
    const [blogTitle, setBlogTitle] = useState("")
    const [duration, setDuration] = useState("")
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("")
    const [cover, setCover] = useState("")
    const [musicFilePath, setMusicFilePath] =useState("")
    const [releaseDate, setReleaseDate] = useState("")

    const descriptionArray = description.split("\n").filter(paragraph => paragraph.trim() !== "");
    const highlightsArray = highlights.split("\n").filter(paragraph => paragraph.trim() !== "");


        const fetchData = async (e:any) =>{
            e.preventDefault()
            try{
                const response = await axios.put(`${apiUrl}/upload`, {
                  title,artist,album, blogTitle,type, duration ,description : descriptionArray, highlights: highlightsArray ,genre,cover,musicFilePath,releaseDate
                });   
                console.log(response)
                if(response.status === 200){
                    alert(response.data.message)
                }
            }
            catch(error:any){
                if (error.response) {
                    console.error("Error:", error.response.data);
                    alert(`Error: ${error.response.data.error || 'Failed to upload the song'}`);
                } else if (error.request) {
                    console.error("No Response:", error.request);
                    alert('No response from server.');
                } else {
                    console.error("Error:", error.message);
                    alert('An unexpected error occurred.');
                }
            }
        }
    

    return (
        <div>
            <h3>Upload  Music</h3>
            <form onSubmit={fetchData} className="upload-form">
                <div className="input-group">
                 <label htmlFor="title">Title: </label>
                <input id="title" type="text" name="title" value={title}
                onChange={(e) => {
                    setTitle(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="artist">Artist: </label>
                <input id="artist" type="text" name="artist" value={artist}
                onChange={(e) => {
                    setArtist(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="featuredArtists">Featured Artists: </label>
                <input id="featuredArtists" type="text" name="featuredArtist" value={featuredArtists}
                onChange={(e) => {
                    setFeaturedArtists(e.target.value)}}/>   
                </div>

                <div className="input-group">
                 <label htmlFor="album">Album: </label>
                <input id="album" type="text" name="album" value={album}
                onChange={(e) => {
                    setAlbum(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="type">Type: </label>
                <input id="type" type="text" name="type" value={type}
                onChange={(e) => {
                    setType(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="duration">Duration: </label>
                <input id="duration" type="text" name="duration" value={duration}
                onChange={(e) => {
                    setDuration(e.target.value)}}
                />   
                </div>
                <div className="input-group">
                 <label htmlFor="blogtitle">Blog Title: </label>
                <textarea id="blogtitle"  name="blogtitle" value={blogTitle}
                onChange={(e) => {
                    setBlogTitle(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="description">Description: </label>
                <textarea id="description"  name="description" value={description}
                onChange={(e) => {
                    setDescription(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="highlights">Hightlights: </label>
                <textarea id="highlights"  name="highlights" value={highlights}
                onChange={(e) => {
                    setHighlights(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="genre">Genre: </label>
                <input id="genre" type="text" name="genre" value={genre}
                onChange={(e) => {
                    setGenre(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="cover">Cover Image: </label>
                <input id="cover" type="text" name="cover" value={cover}
                onChange={(e) => {
                    setCover(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="music-file">Music File: </label>
                <input id="music-file" type="text" name="musicFilePath" value={musicFilePath}
                onChange={(e) => {
                    setMusicFilePath(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="release-date">Release Year: </label>
                <input id="release-date" type="text" name="releaseDate" value={releaseDate}
                onChange={(e) => {
                    setReleaseDate(e.target.value)}}/>   
                </div>   
                <button type="submit">Upload</button>
            </form>

        </div>
    )
}